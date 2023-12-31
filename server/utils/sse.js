const connectedClientsById = new Map();

export function addClient(res, id) {
  if (!connectedClientsById.has(id)) {
    connectedClientsById.set(id, new Set());
  }

  connectedClientsById.get(id).add(res);
}

export function removeClient(res, id) {
  if (connectedClientsById.has(id)) {
    connectedClientsById.get(id).delete(res);

    // Clean up the set if it becomes empty
    if (connectedClientsById.get(id).size === 0) {
      connectedClientsById.delete(id);
    }
  }
}

function sendSseData(data, id) {
  const formattedData = JSON.stringify(data);
  if (connectedClientsById.has(id)) {
    const clients = connectedClientsById.get(id);
    clients.forEach((client) => {
      client.write(`data: ${formattedData}\n\n`);
    });
  }
}

export function sendSseDataToClients(data, id) {
  sendSseData(data, id);
}
