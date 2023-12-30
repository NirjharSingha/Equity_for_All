const connectedClientsByPost = new Map();

export function addClient(res, postId) {
  if (!connectedClientsByPost.has(postId)) {
    connectedClientsByPost.set(postId, new Set());
  }

  connectedClientsByPost.get(postId).add(res);
}

export function removeClient(res, postId) {
  if (connectedClientsByPost.has(postId)) {
    connectedClientsByPost.get(postId).delete(res);

    // Clean up the set if it becomes empty
    if (connectedClientsByPost.get(postId).size === 0) {
      connectedClientsByPost.delete(postId);
    }
  }
}

function sendSseData(data, postId) {
  const formattedData = JSON.stringify(data);
  if (connectedClientsByPost.has(postId)) {
    const clients = connectedClientsByPost.get(postId);
    clients.forEach((client) => {
      client.write(`data: ${formattedData}\n\n`);
    });
  }
}

export function sendSseDataToClients(data, postId) {
  sendSseData(data, postId);
}
