import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { KeyboardAvoidingView, ScrollView, Pressable, Modal, FlatList, View, Alert } from 'react-native';
import { globals } from '@/styles/_global';
import { UserRole, RoleDetails, getRoleDetails } from '@/types/user';
import { router } from 'expo-router';

export default function Login() {
  const { authenticate, isLoadingAuth } = useAuth();

  const [authMode, setAuthMode] = useState<"login" | "register">('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Attendee);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const roleDetails = getRoleDetails();

  async function onAuthenticate() {
    try {
      if (authMode === 'login') {
        await authenticate(authMode, email, password, role);
      } else {
        await authenticate(authMode, email, password, role);
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  useEffect(() => {
    if (registrationSuccess) {
      Alert.alert(
        "Registration Successful", 
        "Your account has been created successfully!",
        [{ text: "OK", onPress: () => router.replace('(authed)') }]
      );
    }
  }, [registrationSuccess]);
  
  function toggleRoleModal() {
    setShowRoleModal(!showRoleModal);
  }
  
  function selectRole(selectedRole: UserRole) {
    setRole(selectedRole);
    setShowRoleModal(false);
  }

  function onToggleAuthMode() {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={ globals.container }>
      <ScrollView contentContainerStyle={ globals.container }>
        <VStack flex={ 1 } justifyContent='center' alignItems='center' p={ 40 } gap={ 40 }>

          <HStack gap={ 10 }>
            <Text fontSize={ 30 } bold mb={ 20 }>Ticket Booking</Text>
            <TabBarIcon name="ticket" size={ 50 } />
          </HStack >

          <VStack w={ "100%" } gap={ 30 }>

            <VStack gap={ 5 }>
              <Text ml={ 10 } fontSize={ 14 } color="gray">Email</Text>
              <Input
                value={ email }
                onChangeText={ setEmail }
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack>

            <VStack gap={ 5 }>
              <Text ml={ 10 } fontSize={ 14 } color="gray">Password</Text>
              <Input
                value={ password }
                onChangeText={ setPassword }
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack>
            
            <VStack gap={ 5 }>
              <Text ml={ 10 } fontSize={ 14 } color="gray">Role</Text>
              <Pressable onPress={toggleRoleModal}>
                <View style={{ position: 'relative' }}>
                  <Input
                    value={RoleDetails[role].displayName}
                    editable={false}
                    placeholder="Select a role"
                    placeholderTextColor="darkgray"
                    h={ 48 }
                    p={ 14 }
                  />
                  <View 
                    style={{ 
                      position: 'absolute', 
                      right: 14, 
                      top: 0, 
                      bottom: 0, 
                      justifyContent: 'center' 
                    }}
                  >
                    <TabBarIcon name="chevron-down" size={18} />
                  </View>
                </View>
              </Pressable>
              
              <Modal
                animationType="slide"
                transparent={true}
                visible={showRoleModal}
                onRequestClose={toggleRoleModal}
              >
                <Pressable 
                  style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                  onPress={toggleRoleModal}
                >
                  <VStack 
                    bg="white" 
                    borderRadius={10} 
                    mx={20} 
                    p={20}
                  >
                    <Text fontSize={18} bold mb={10}>Select Role</Text>
                    <FlatList
                      data={roleDetails}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => (
                        <Pressable 
                          onPress={() => selectRole(item.value)}
                          style={{ 
                            padding: 15, 
                            borderBottomWidth: 1, 
                            borderBottomColor: '#eee',
                            backgroundColor: role === item.value ? '#f0f8ff' : 'white',
                            borderRadius: 5
                          }}
                        >
                          <Text bold>{item.displayName}</Text>
                          <Text fontSize={12} color="gray" mt={4}>{item.description}</Text>
                        </Pressable>
                      )}
                    />
                  </VStack>
                </Pressable>
              </Modal>
            </VStack>

            <Button isLoading={ isLoadingAuth } onPress={ onAuthenticate }>{ authMode }</Button>

          </VStack>

          <Divider w={ "90%" } />

          <Text onPress={ onToggleAuthMode } fontSize={ 16 } underline>
            { authMode === 'login' ? 'Register new account' : 'Login to account' }
          </Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}
