import { of, scan, map } from 'rxjs';

const numbers$ = of(1, 2, 3);

numbers$
    .pipe(
        scan((total, n) => total + n),
        map((sum, index) => sum / (index + 1))
    )
    .subscribe(console.log);
