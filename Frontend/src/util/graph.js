// Haversine formula to calculate distance between 2 coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }


  export function buildPriceGraph(hotels){
    
  }

  // Build a graph where user is connected to all hotels
  export function buildGraph(userLocation, hotels) {
    const graph = {};
    const userNode = "user";
  
    graph[userNode] = [];
  
    hotels.forEach((hotel) => {
      const dist = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        hotel.location.lat,
        hotel.location.lng
      );
  
      graph[userNode].push({ node: hotel.id, weight: dist });
      graph[hotel.id] = [{ node: userNode, weight: dist }];
    });
  
    return graph;
  }
  
  // Dijkstra's Algorithm from source node (user) to all hotel nodes
  export function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const nodes = Object.keys(graph);
  
    // Initialize distances
    for (let node of nodes) {
      distances[node] = Infinity;
    }
    distances[start] = 0;
  
    while (visited.size < nodes.length) {
      let minDistance = Infinity;
      let closestNode = null;
  
      // Find unvisited node with smallest distance
      for (let node of nodes) {
        if (!visited.has(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          closestNode = node;
        }
      }
  
      if (!closestNode) break;
  
      visited.add(closestNode);
  
      // Update distances to neighbors
      for (let neighbor of graph[closestNode]) {
        const alt = distances[closestNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
        }
      }
    }
  
    return distances;
  }
  