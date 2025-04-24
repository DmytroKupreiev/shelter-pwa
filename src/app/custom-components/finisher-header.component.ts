import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-finisher-header',
  template: `<div [id]="elementId" style="position: absolute; width: 100%; height: 100%; z-index: -1;"></div>`,
  standalone: true
})
export class FinisherHeaderComponent implements AfterViewInit {
  @Input() elementId = 'finisher-header';

  ngAfterViewInit(): void {
    setTimeout(() => {
      requestAnimationFrame(() => {
        const oldCanvas = document.querySelector('canvas.finisher-canvas');
        if (oldCanvas) oldCanvas.remove();

        if ((window as any).FinisherHeader) {
          new (window as any).FinisherHeader({
            element: this.elementId,
            count: 100,
            size: { min: 1, max: 2, pulse: 0 },
            speed: {
              x: { min: 0, max: 0.4 },
              y: { min: 0, max: 0.6 }
            },
            colors: {
              background: "#1e302b",
              particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"]
            },
            blending: "none",
            opacity: {
              center: 1,
              edge: 0.5
            },
            skew: -2,
            shapes: ["c"]
          });
        } else {
          console.error('FinisherHeader is not loaded');
        }
      });
    });
  }
}
