import { dispatchEvent } from '../communication/eventDispatcher';

class ProviderCoordinator {
    public routeToProvider(payload: string): void {
        dispatchEvent('PROVIDER_ROUTED', { payload }, 'providerCoordinator');
    }
}

export const providerCoordinator = new ProviderCoordinator();
