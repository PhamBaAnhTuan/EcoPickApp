import { Share } from 'react-native';

export type ShareEventParams = {
  type: 'event';
  title: string;
  description?: string;
  coords?: { latitude: number; longitude: number };
  eventId?: string;
};

export type ShareReportParams = {
  type: 'report';
  title: string;
  description?: string;
  address?: string;
  severity?: string;
  coords?: { latitude: number; longitude: number };
  reportId?: string;
};

export type ShareGenericParams = {
  type: 'generic';
  title: string;
  message: string;
};

export type ShareParams = ShareEventParams | ShareReportParams | ShareGenericParams;

export type ShareResult =
  | { success: true }
  | { success: false; reason: 'dismissed' | 'error'; error?: unknown };

function buildMapsLink(coords?: { latitude: number; longitude: number }): string {
  if (!coords) return '';
  return `🗺️ https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
}

function composeMessage(params: ShareParams): string {
  const viaEcoPick = '— via EcoPick 🌏';
  
  switch (params.type) {
    case 'event': {
      const parts = [
        `🌿 ${params.title}`,
        params.description ? `${params.description}` : '',
        buildMapsLink(params.coords),
        viaEcoPick,
      ];
      return parts.filter(Boolean).join('\n').trim();
    }
    case 'report': {
      const parts = [
        `📍 ${params.title}`,
        params.severity ? `Severity: ${params.severity}` : '',
        params.address ? `Address: ${params.address}` : '',
        params.description ? `${params.description}` : '',
        buildMapsLink(params.coords),
        viaEcoPick,
      ];
      return parts.filter(Boolean).join('\n').trim();
    }
    case 'generic': {
      return `${params.title}\n${params.message}\n${viaEcoPick}`;
    }
  }
}

export async function shareContent(params: ShareParams): Promise<ShareResult> {
  try {
    const message = composeMessage(params);
    const result = await Share.share({
      message,
      title: params.title, // used by some native share dialogs
    });

    if (result.action === Share.sharedAction) {
      return { success: true };
    } else if (result.action === Share.dismissedAction) {
      return { success: false, reason: 'dismissed' };
    }
    return { success: false, reason: 'error' };
  } catch (error) {
    return { success: false, reason: 'error', error };
  }
}
