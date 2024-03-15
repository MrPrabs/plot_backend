// addressUtils.ts
export function parseCityFromAddress(address: string): string {
    const addressComponents = address.split(',');
    let city = '';
    for (const component of addressComponents) {
      const trimmedComponent = component.trim();
      if (trimmedComponent.endsWith('city')) {
        city = trimmedComponent;
        break;
      }
    }
    return city;
  }
  