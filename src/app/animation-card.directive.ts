import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAnimationCard]',
  exportAs: 'appAnimationCard',
})
export class AnimationCardDirective implements AfterViewInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  private left!: number;
  private top!: number;
  private width!: number;
  private height!: number;
  private distanceTotal!: number;

  ngAfterViewInit(): void {
    // Save element position and dimension
    this.renderer.addClass(this.elementRef.nativeElement, 'animation-card');
    this.left = this.elementRef.nativeElement.offsetLeft;
    this.top = this.elementRef.nativeElement.offsetTop;
    this.width = this.elementRef.nativeElement.offsetWidth / 2;
    this.height = this.elementRef.nativeElement.offsetHeight / 2;

    this.distanceTotal = norme(this.width, this.height);

    // Add shine effect
    const shine = this.renderer.createElement('div');
    this.renderer.addClass(shine, 'animation-card__shine');
    this.renderer.appendChild(this.elementRef.nativeElement, shine);

    // Add glare effect
    const glare = this.renderer.createElement('div');
    this.renderer.addClass(glare, 'animation-card__glare');
    this.renderer.appendChild(this.elementRef.nativeElement, glare);
  }

  @HostListener('mouseleave', ['$event'])
  private mouseLeave(event: any): void {
    // Reset all variable to disable effect
    this.setVariable(0, 0, 0, 0, 0, 0, 0, 0);
  }

  @HostListener('mousemove', ['$event'])
  private mouseMove(event: any): void {
    // Define cursor position in the element referentiel
    const x = -1 * (event.pageX - this.left - this.width);
    const y = event.pageY - this.top - this.height;

    // Compute relative distance from the center of the element
    const distance = norme(x, y) / this.distanceTotal;

    this.setVariable(
      event.pageX - this.left,
      event.pageY - this.top,
      x,
      y,
      50 - 30 * distance,
      50 - 30 * distance,
      distance
    );
  }

  private setVariable(
    x: number,
    y: number,
    rotateX: number,
    rotateY: number,
    backgroundX: number,
    backgroundY: number,
    angle: number,
    opacity = 1
  ): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'style',
      [
        '--pointer-x:' + x,
        '--pointer-y:' + y,
        '--rotate-x:' + rotateX,
        '--rotate-y:' + rotateY,
        '--background-x:' + backgroundX + '%',
        '--background-y:' + backgroundY + '%',
        '--rotate-angle:' + angle,
        '--card-opacity:' + opacity,
      ].join(';')
    );
  }
}

function norme(x: number, y: number): number {
  return Math.sqrt(x ** 2 + y ** 2);
}
