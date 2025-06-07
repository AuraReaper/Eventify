import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { eventService } from '@/services/events';
import { ticketService } from '@/services/tickets';
import { Event } from '@/types/event';
import { UserRole } from '@/types/user';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [userTicketEventIds, setUserTicketEventIds] = useState<number[]>([]);

  function onGoToEventPage(id: number) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  }

  async function buyTicket(id: number) {
    try {
      await ticketService.createOne(id);
      Alert.alert("Success", "Ticket purchased successfully");
      fetchEvents();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to buy ticket";
      Alert.alert("Error", errorMessage);
    }
  }

  // Check which events the user has tickets for
  const fetchUserTickets = async () => {
    if (user?.role !== UserRole.Attendee) return;
    
    try {
      const response = await ticketService.getAll();
      const eventIds = response.data.map(ticket => ticket.eventId);
      setUserTicketEventIds(eventIds);
    } catch (error) {
      console.error("Failed to fetch user tickets:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
      
      // Fetch user tickets to determine registration status
      await fetchUserTickets();
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchEvents(); }, []));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Events",
      headerRight: user?.role === UserRole.Manager ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>

      <HStack alignItems='center' justifyContent='space-between'>
        <Text fontSize={18} bold>
          {user?.role === UserRole.Manager 
            ? `${events.length} Events` 
            : 'Available Events'}
        </Text>
      </HStack>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={events}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VStack h={20} />}
        renderItem={({ item: event }) => (
          <VStack
            gap={20}
            p={20}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
            }} key={event.id}>

            <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
              <HStack alignItems='center' justifyContent="space-between">
                <HStack alignItems='center'>
                  <Text fontSize={26} bold >{event.name}</Text>
                  <Text fontSize={26} bold > | </Text>
                  <Text fontSize={16} bold >{event.location}</Text>
                </HStack>
                {user?.role === UserRole.Manager && <TabBarIcon size={24} name="chevron-forward" />}
              </HStack>
            </TouchableOpacity>

            {user?.role === UserRole.Manager && (
              <>
                <Divider />
                <HStack justifyContent='space-between'>
                  <Text bold fontSize={16} color='gray'>Registered: {event.totalTicketsPurchased}</Text>
                  <Text bold fontSize={16} color='green'>Attended: {event.totalTicketsEntered}</Text>
                </HStack>
              </>
            )}

            {user?.role === UserRole.Attendee && (
              <VStack>
                {userTicketEventIds.includes(event.id) ? (
                  <Button
                    variant='outlined'
                    disabled={true}
                    style={{ backgroundColor: '#e6f7e6', borderColor: '#4caf50' }}
                  >
                    Registered
                  </Button>
                ) : (
                  <Button
                    variant='outlined'
                    disabled={isLoading}
                    onPress={() => buyTicket(event.id)}
                  >
                    Buy Ticket
                  </Button>
                )}
              </VStack>
            )}

            <Text fontSize={13} color='gray'>{event.date}</Text>
          </VStack>

        )}
      />

    </VStack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon size={32} name="add-circle-outline" onPress={() => router.push('/(events)/new')} />
  );
};
