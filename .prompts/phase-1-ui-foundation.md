# Phase 1: UI Foundation - Mobile Navigation & Komponenten

## Context

Arbeite an der DEHS B2B-Webseite (Next.js 14, Strapi 4, Tailwind CSS).
Lies zuerst CLAUDE.md fuer Projekt-Details.

**Aktueller Stand:**
- Header existiert in `apps/web/src/app/(marketing)/layout.tsx`
- Mobile Menu Button vorhanden, aber ohne Funktion
- Keine Toast/Modal/Skeleton Komponenten

## Ziel

Erstelle die UI-Grundlagen fuer alle weiteren Features:
1. Mobile Navigation mit Slide-In Menu
2. Wiederverwendbare UI-Komponenten

**Success Criteria:**
- [ ] Mobile Menu oeffnet/schliesst mit Animation
- [ ] Kategorien im Mobile Menu aufklappbar
- [ ] Menu schliesst bei Klick auf Link oder ausserhalb
- [ ] Skeleton Komponente fuer Loading States
- [ ] Toast-System fuer Benachrichtigungen
- [ ] Modal-Komponente fuer Dialoge

## Requirements

### 1. Mobile Navigation

**Datei:** `components/navigation/MobileMenu.tsx`

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}
```

Features:
- Slide-in von rechts (translateX Animation)
- Overlay dahinter (klickbar zum Schliessen)
- Kategorien als Accordion (aufklappbar)
- Alle Links aus dem Desktop-Header
- Focus Trap (Tab bleibt im Menu)
- Escape-Taste schliesst Menu
- Body-Scroll deaktivieren wenn offen

**Layout Update:** `apps/web/src/app/(marketing)/layout.tsx`
- State fuer Menu (useState)
- MobileMenu Komponente einbinden
- Hamburger Button mit onClick

### 2. Skeleton Komponente

**Datei:** `components/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number; // Fuer mehrere Zeilen
}
```

- Animate-pulse Animation
- Verschiedene Varianten
- Einfach kombinierbar

**Skeleton Presets:**
```typescript
// components/ui/skeletons/ProductCardSkeleton.tsx
// components/ui/skeletons/ProductDetailSkeleton.tsx
```

### 3. Toast-System

**Datei:** `components/ui/Toast.tsx` und `contexts/ToastContext.tsx`

```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number; // Default 5000ms
}

// Hook Usage
const { addToast } = useToast();
addToast({ type: 'success', message: 'Formular gesendet!' });
```

- Position: unten rechts
- Stackable (mehrere gleichzeitig)
- Auto-dismiss nach duration
- Manuell schliessbar
- Enter/Exit Animation

### 4. Modal Komponente

**Datei:** `components/ui/Modal.tsx`

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
```

- Centered mit Overlay
- Escape zum Schliessen
- Klick auf Overlay schliesst
- Focus Trap
- Animations (fade + scale)

## Constraints

- Keine externen UI-Libraries (kein Headless UI, kein Radix)
- Nur Tailwind CSS fuer Styling
- Accessibility beachten (ARIA, Focus)
- Deutsche Texte wo noetig

## Implementation

1. Erstelle `components/ui/Skeleton.tsx`
2. Erstelle `components/ui/Toast.tsx` und `contexts/ToastContext.tsx`
3. Erstelle `components/ui/Modal.tsx`
4. Erstelle `components/navigation/MobileMenu.tsx`
5. Update `app/(marketing)/layout.tsx` fuer Mobile Menu
6. Erstelle Skeleton Presets fuer ProductCard

## Was NICHT tun

- Keine bestehenden Komponenten refactoren
- Keine neuen Pages erstellen
- Keine Strapi-Aenderungen
- Keine Tests schreiben
