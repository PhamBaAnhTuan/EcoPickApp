import { Colors } from '../constants/Colors';
import { SeverityLevel } from '../data/mockData';

interface SeverityTheme {
  backgroundColor: string;
  borderColor: string;
  dotColor: string;
  textColor: string;
}

export function getSeverityTheme(severity: SeverityLevel): SeverityTheme {
  switch (severity) {
    case 'light':
      return {
        backgroundColor: Colors.severityLightBg,
        borderColor: Colors.severityLightBorder,
        dotColor: Colors.severityLightDot,
        textColor: Colors.severityLightText,
      };
    case 'medium':
      return {
        backgroundColor: Colors.severityMediumBg,
        borderColor: Colors.severityMediumBorder,
        dotColor: Colors.severityMediumDot,
        textColor: Colors.severityMediumText,
      };
    case 'heavy':
      return {
        backgroundColor: Colors.severityHeavyBg,
        borderColor: Colors.severityHeavyBorder,
        dotColor: Colors.severityHeavyDot,
        textColor: Colors.severityHeavyText,
      };
    case 'extreme':
      return {
        backgroundColor: Colors.severityExtremeBg,
        borderColor: Colors.severityExtremeBorder,
        dotColor: Colors.severityExtremeDot,
        textColor: Colors.severityExtremeText,
      };
  }
}

export function getSeverityIcon(severity: SeverityLevel): { name: string; bgColor: string } {
  switch (severity) {
    case 'light':
      return { name: 'leaf', bgColor: 'rgba(22, 163, 74, 0.1)' };
    case 'medium':
      return { name: 'alert-circle-outline', bgColor: Colors.iconYellowBg };
    case 'heavy':
      return { name: 'trash-outline', bgColor: Colors.iconRedBg };
    case 'extreme':
      return { name: 'warning-outline', bgColor: 'rgba(147, 51, 234, 0.1)' };
  }
}
