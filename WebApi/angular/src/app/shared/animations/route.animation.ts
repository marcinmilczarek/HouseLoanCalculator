import {
    trigger,
    style,
    animate,
    transition,
    query,
    group,
  } from '@angular/animations';
  
  const resetRoute = [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: '64px',
          left: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
  ];
  export const RouteFadeAnimation = [
    trigger('routeFadeAnimation', [
      transition('loan-calculator => about', [
        ...resetRoute,
        query(':enter', [style({ transform: 'translateY(100px)', opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [
              style({ opacity: 1 }),
              animate(
                '0.2s',
                style({ transform: 'translateY(100px)', opacity: 0 })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({ opacity: 0 }),
              animate('0.5s', style({ transform: 'translateY(0)', opacity: 1 })),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition('about => loan-calculator', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
          ),
          query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
      transition('about => currency', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
          ),
          query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
      transition('currency => about', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
          ),
          query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
      transition('loan-calculator => currency', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
          ),
          query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
      transition('currency => loan-calculator', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
          ),
          query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ];
  