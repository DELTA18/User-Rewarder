import { cn } from '../../lib/utils';

export function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}