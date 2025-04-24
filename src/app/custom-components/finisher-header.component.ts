import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-finisher-header',
  template: `<div [id]="elementId" style="position: absolute; width: 100%; height: 100%; z-index: -1;"></div>`,
  standalone: true
})
export class FinisherHeaderComponent implements AfterViewInit {
  // Input property for custom element ID (default: 'finisher-header')
  @Input() elementId = 'finisher-header';

  ngAfterViewInit(): void {
    // Delay initialization to ensure DOM is ready
    setTimeout(() => {
      requestAnimationFrame(() => {
        // Remove any existing canvas to prevent duplicates
        const oldCanvas = document.querySelector('canvas.finisher-canvas');
        if (oldCanvas) oldCanvas.remove();

        // Check if FinisherHeader library is loaded
        if ((window as any).FinisherHeader) {
          // Initialize particle animation with configuration
          new (window as any).FinisherHeader({
            element: this.elementId,  // Target container ID
            count: 100,               // Number of particles
            size: { min: 1, max: 2, pulse: 0 },
            speed: {                  // Movement speed ranges
              x: { min: 0, max: 0.4 },
              y: { min: 0, max: 0.6 }
            },
            colors: {                 // Color scheme
              background: "#1e302b",  // Dark background
              particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"]  // Particle colors
            },
            blending: "none",         // No blending mode
            opacity: {                // Opacity settings
              center: 1,              // Fully opaque at center
              edge: 0.5               // Semi-transparent at edges
            },
            skew: -2,                 // Skew effect
            shapes: ["c"]             // Use circles only
          });
        } else {
          console.error('FinisherHeader is not loaded');
        }
      });
    });
  }
}