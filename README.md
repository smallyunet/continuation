# Continuation Learning Path

This repository contains a structured learning path for understanding continuations and related concepts in programming languages. The code examples demonstrate different aspects of continuation-passing style (CPS), coroutines, and control flow mechanisms across multiple lessons.

## Overview

Continuations are a powerful control flow concept that represents "the rest of the computation" at any point in a program. This repository provides hands-on examples to help understand:

- Continuation-Passing Style (CPS)
- Cooperative multitasking with yield
- Call with Current Continuation (call/cc)
- Delimited continuations with shift/reset
- Preemptive coroutines
- Practical applications in JavaScript and Racket

## Repository Structure

The repository is organized into lessons, each focusing on specific continuation concepts:

### Lesson 1: Continuation-Passing Style (CPS)
- [01_factorial_stack_depth.js](lesson1/01_factorial_stack_depth.js) - Measuring stack depth in recursive functions
- [02_cps_introduction.js](lesson1/02_cps_introduction.js) - Introduction to continuation-passing style
- [03_cps_advanced.js](lesson1/03_cps_advanced.js) - Advanced CPS patterns

### Lesson 2: Yield and Basic Schedulers
- [04_simple_scheduler.js](lesson2/04_simple_scheduler.js) - Implementation of a simple task scheduler
- [05_generator_basics.js](lesson2/05_generator_basics.js) - Basics of JavaScript generators
- [09_yield_example.js](lesson2/09_yield_example.js) - Examples of yield functionality in CPS

### Lesson 3: Call with Current Continuation (call/cc)
- [06_callcc_basics.js](lesson3/06_callcc_basics.js) - Introduction to call/cc
- [07_callcc_examples.js](lesson3/07_callcc_examples.js) - Various call/cc implementations
- [08_escape_continuation.js](lesson3/08_escape_continuation.js) - Using continuations for non-local returns
- [09_control_flow.js](lesson3/09_control_flow.js) - Control flow manipulation with call/cc
- [10_advanced_callcc.js](lesson3/10_advanced_callcc.js) - Advanced call/cc applications

### Lesson 4: Shift/Reset Delimited Continuations
- [11_shift_reset_intro.js](lesson4/11_shift_reset_intro.js) - Introduction to shift/reset
- [12_delimited_continuation.js](lesson4/12_delimited_continuation.js) - Delimited continuation concepts
- [13_shift_examples.js](lesson4/13_shift_examples.js) - Examples of the shift operator
- [14_reset_examples.js](lesson4/14_reset_examples.js) - Examples of the reset operator
- [15_advanced_shift_reset.js](lesson4/15_advanced_shift_reset.js) - Advanced applications

### Lesson 5: Racket Implementation
- [01_racket_basics.rkt](lesson5/01_racket_basics.rkt) - Basic continuation concepts in Racket

### Lesson 6: Preemptive Coroutines
- [16_preemptive_intro.js](lesson6/16_preemptive_intro.js) - Introduction to preemptive scheduling
- [17_coroutine_basics.js](lesson6/17_coroutine_basics.js) - Basic coroutine concepts
- [18_coroutine_scheduler.js](lesson6/18_coroutine_scheduler.js) - Implementing a coroutine scheduler
- [19_coroutine_examples.js](lesson6/19_coroutine_examples.js) - Examples of coroutines
- [20_advanced_preemptive.js](lesson6/20_advanced_preemptive.js) - Advanced preemptive scheduling
- [21_complete_implementation.js](lesson6/21_complete_implementation.js) - Complete coroutine system implementation

### Lesson 7: Practice Problems
- [01_practice_problem.js](lesson7/01_practice_problem.js) - Practice exercises on CPS and continuations

### Lesson 8: Test Suite
- [01_test_suite.js](lesson8/01_test_suite.js) - Tests for continuation concepts

## Learning Resources

To deepen your understanding of continuations, here are some recommended resources:

- [Continuation-Passing Style in Computer Science](https://en.wikipedia.org/wiki/Continuation-passing_style)
- [The Scheme Programming Language: Continuations](https://www.scheme.com/tspl4/control.html)
- [Delimited Continuations in Operating Systems](https://www.cs.indiana.edu/~dyb/papers/rest+proc.pdf)
- [JavaScript Generators and Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

## Usage

The examples in this repository can be run using Node.js for JavaScript files:

```bash
node lesson1/01_factorial_stack_depth.js
```

For Racket files, use the Racket interpreter:

```bash
racket lesson5/01_racket_basics.rkt
```

## License

This repository is for educational purposes.