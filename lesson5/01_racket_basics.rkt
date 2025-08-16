#lang racket

;; Racket Basics and Continuations
;; 
;; This file demonstrates basic Racket syntax and continuation concepts
;; including call/cc and shift/reset delimited continuations in Racket.

;; Regular function definition for addition
(define (add a b)
  (+ a b))

(displayln (add 1 2))

;; CPS style addition function that takes a continuation
(define (add-cps a b k)
  (k (+ a b)))

(add-cps 1 2 (lambda (x) (displayln x)))

;; Example of call/cc (call-with-current-continuation) in Racket
(displayln
 (call/cc
  (lambda (k)
    (displayln 1)
    (k 2)         ;; Captures the current continuation and jumps out with value 2
    (displayln 3) ;; This line is never executed
    )))

; 1
; 2

(displayln "----------------")

;; Import the shift/reset operators
(require racket/control)

;; Example of reset (delimits the scope of shift)
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
