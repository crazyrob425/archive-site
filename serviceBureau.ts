import { notifyOwner } from "./_core/notification";

export async function notifyOwnerOfServiceBureauRequest(request: {
  id: number;
  name: string;
  email: string;
  projectTitle: string;
  description: string;
}) {
  try {
    const content = `
New Service Bureau Request

Name: ${request.name}
Email: ${request.email}
Project: ${request.projectTitle}

Description:
${request.description}

Request ID: ${request.id}

View all requests: https://archive-rare-knowledge.com/admin
    `.trim();

    const result = await notifyOwner({
      title: `New Service Bureau Request: ${request.projectTitle}`,
      content,
    });

    return result;
  } catch (error) {
    console.error("Failed to notify owner of service bureau request:", error);
    return false;
  }
}
