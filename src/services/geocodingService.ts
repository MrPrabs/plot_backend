// geocodingService.ts

import axios from 'axios';

interface GeocodingResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

export async function convertAddressToCoordinates(address: string): Promise<{ latitude: number; longitude: number }> {
  try {
    const response = await axios.get<GeocodingResponse>('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: 'AIzaSyCHUdphdZ9ojeoDJiorIr3enjJnuRPvZK8', // Replace with your actual Google Maps API key
      },
    });

    const location = response.data.results[0].geometry.location;
    return { latitude: location.lat, longitude: location.lng };
  } catch (error) {
    console.error('Error converting address to coordinates:', error);
    throw new Error('Failed to convert address to coordinates');
  }
}
