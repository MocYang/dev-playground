import {
  Observable,
  Subject,
  from,
  of,
  range,
} from 'rxjs'
import {
  map,
  filter,
  switchMap
} from 'rxjs/operators';

import "./scss/style.scss"

const $ = (selector) => document.querySelector(selector)
const $btnClick = $('.btn__click')
const $counterText = $('.count-text')

Observable
  .fromEvent($btnClick, 'click')
  .subscribe(() => console.log(1))


