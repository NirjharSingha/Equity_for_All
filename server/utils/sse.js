const connectedClients = new Set();

export function addClient(res) {
  connectedClients.add(res);
}

export function removeClient(res) {
  connectedClients.delete(res);
}

function sendSseData(data) {
  const formattedData = JSON.stringify(data);
  connectedClients.forEach((client) => {
    client.write(`data: ${formattedData}\n\n`);
  });
}

export function sendSseDataToClients(data) {
  sendSseData(data);
}
