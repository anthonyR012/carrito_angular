import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CounterComponent } from '@shared/components/counter/counter.component';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [CommonModule, CounterComponent, WaveAudioComponent],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  observeWithInit$ = new BehaviorSubject<string>('Init value');
  $signalWithInit = toSignal(this.observeWithInit$, {
    requireSync: true,
  });

  observeWithoutInit$ = new Subject<string>();
  $signalWithoutInit = toSignal(this.observeWithoutInit$.pipe(delay(3000)), {
    requireSync: false,
    initialValue: 'Initial value',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  emitWithInit() {
    this.observeWithInit$.next('New value');
  }

  emitWithoutInit() {
    this.observeWithoutInit$.next('*****');
  }
}
