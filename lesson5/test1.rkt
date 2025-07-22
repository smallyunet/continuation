#lang racket

(define (add a b)
  (+ a b))

(displayln (add 1 2))

(define (add-cps a b k)
  (k (+ a b)))

(add-cps 1 2 (lambda (x) (displayln x)))

(displayln
 (call/cc
  (lambda (k)
    (displayln 1)
    (k 2)
    (displayln 3)
    )))

; 1
; 2

(displayln "----------------")

(require racket/control)

(displayln
 (reset
  (displayln 1)
  (shift k
         (displayln 2)
         (k 3)
         (displayln 4)
         )
  (displayln 5)
  ))

; 1
; 2
; 5
; 4
; #<void>
