import { Ticket, TicketListResponse, TicketResponse } from "@/types/ticket";
import { Api } from "./api";
import { ApiResponse } from "@/types/api";

/**
 * Checks if the current user already has a ticket for the specified event
 * @param eventId The ID of the event to check
 * @returns True if the user already has a ticket, false otherwise
 */
async function hasTicketForEvent(eventId: number): Promise<boolean> {
  try {
    const response = await getAll();
    return response.data.some(ticket => ticket.eventId === eventId);
  } catch (error) {
    console.error("Error checking existing tickets:", error);
    return false;
  }
}

/**
 * Creates a new ticket for the current user
 * @param eventId The ID of the event to create a ticket for
 * @returns The created ticket
 * @throws Error if the user already has a ticket for this event
 */
async function createOne(eventId: number): Promise<TicketResponse> {
  // Check if user already has a ticket for this event
  const hasExistingTicket = await hasTicketForEvent(eventId);
  
  if (hasExistingTicket) {
    throw new Error("You already have a ticket for this event. Only one ticket per event is allowed.");
  }
  
  return Api.post("/ticket", { eventId });
}

async function getOne(id: number): Promise<ApiResponse<{ ticket: Ticket, qrcode: string }>> {
  return Api.get(`/ticket/${id}`);
}

async function getAll(): Promise<TicketListResponse> {
  return Api.get("/ticket");
}

async function validateOne(ticketId: number, ownerId: number): Promise<TicketResponse> {
  return Api.post("/ticket/validate", { ticketId, ownerId });
}

const ticketService = {
  createOne,
  getOne,
  getAll,
  validateOne,
}

export { ticketService }
