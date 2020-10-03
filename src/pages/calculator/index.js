import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import { Container, DisplayArea, ButtonArea, CalcButton } from './style'

export default function Calculator() {
  const [result, setResult] = useState()
  const [expression, setExpression] = useState('');

  const buttons = [
    ['AC', () => clearAll(), { color: '#107dac' }],
    ['⌫', () => clear()],
    ['%', () => percentage()],
    ['÷', () => addSymbol(' ÷ ')],
    ['7', () => addNumber(7)],
    ['8', () => addNumber(8)],
    ['9', () => addNumber(9)],
    ['x', () => addSymbol(' x ')],
    ['4', () => addNumber(4)],
    ['5', () => addNumber(5)],
    ['6', () => addNumber(6)],
    ['-', () => addSymbol(' - ')],
    ['1', () => addNumber(1)],
    ['2', () => addNumber(2)],
    ['3', () => addNumber(3)],
    ['+', () => addSymbol(' + ')],
    [' ', () => ''],
    ['0', () => addNumber(0)],
    ['.', () => addDot()],
    ['=', () => equals()]
  ]


  function addNumber(x) {
    setExpression(expression + x)
  }


  function clearAll() {
    setExpression('');
    setResult();
  }


  function clear() {
    (expression.substr(-1) === ' ')
      ? setExpression(expression.slice(0, -3))
      : setExpression(expression.slice(0, -1));
  }


  function equals() {
    evaluateExpression();
  }


  function addSymbol(s) {
    if (' - ' === s && !expression.substr(-1))
        setExpression(expression + '-')

    else if (!['', ' '].includes(expression.substr(-1)))
      setExpression(expression + s)
  }


  function addDot() {
    if (expression.substr(-1) === '.')
      return

    if (!expression){
      setExpression('0.')
      return
    }

    setExpression(expression + '.')
  }


  function percentage() {
    const [p, operation, ...rest] = expression.split(' ').reverse();

    if (!p)
      return

    const leftSide = rest.reverse().join(' ')
    const resultLeft = evaluateExpression(leftSide)
    if (['+', '-'].includes(operation)) {
      setExpression(`${leftSide} ${operation} ${(resultLeft / 100 * p)}`)
      return
    }

    !!leftSide
      ? setExpression(`${leftSide} ${operation} ${(p / 100)}`)
      : setExpression((p / 100).toString())
  }


  function calc(expression, index, func) {
    const x = index - 1;
    const y = index + 1;
    expression[index] = func(expression[x], expression[y])
    expression.splice(y, 1)
    expression.splice(x, 1)

    return expression;
  }


  const evaluateExpression = (e) => {
    e = e.split(' ');
    const symbols = ['x', '÷']

    while (symbols.some(s => e.includes(s))) {
      let mult = e.indexOf('x');
      let div = e.indexOf('÷');

      if (!(div + 1)) {
        div = Infinity
      }
      if (!(mult + 1)) {
        mult = Infinity
      }

      if (mult < div) {
        e = calc(e, mult, (x, y) => parseFloat(x) * parseFloat(y))
        continue
      }

      e = calc(e, div, (x, y) => parseFloat(x) / parseFloat(y))
    }

    while (e.includes('-')) {
      let i = e.indexOf('-')
      e = calc(e, i, (x, y) => parseFloat(x) - parseFloat(y))
    }

    while (e.includes('+')) {
      let i = e.indexOf('+')
      e = calc(e, i, (x, y) => parseFloat(x) + parseFloat(y))
    }

    !isNaN(e) ? setResult(e.toString()) : ''
    return e
  }


  useEffect(() => {
    evaluateExpression(expression)
  }, [expression])


  return (
    <Container>
      <ButtonArea>

        <DisplayArea>
          <Text style={{ color: '#fff', fontSize: 33, marginRight: 10 }}>{expression}</Text>
          {(!!result && expression.length > 0)
            ? <Text style={{ color: '#888', fontSize: 29, marginRight: 10 }}>= {parseFloat(result)}</Text>
            : <Text style={{ color: '#888', fontSize: 29, marginRight: 10 }}>0</Text>}
        </DisplayArea>

        {buttons.map(button =>

          <CalcButton
            key={button[0]}
            onPress={() => button[1]()}>
            <Text style={{ fontSize: 30, color: '#ddd', ...button[2] }}>{button[0]}</Text>
          </CalcButton>
        )}
      </ButtonArea>
    </Container>
  )
}