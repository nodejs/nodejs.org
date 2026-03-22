---
date: 2026-02-20T17:00:00.000Z
category: uncategorized
title: MathML Rendering Test
layout: blog-post
author: Joyee Cheung
---

Testing block and inline MathML rendering. Geometric series, finite and infinite:

<math display="block">
  <mtable columnalign="left">
    <mtr>
      <mtd>
        <msub><mi>S</mi><mi>n</mi></msub>
        <mo>=</mo>
        <munderover>
          <mo>&#x2211;</mo>
          <mrow><mi>k</mi><mo>=</mo><mn>0</mn></mrow>
          <mrow><mi>n</mi><mo>-</mo><mn>1</mn></mrow>
        </munderover>
        <msup><mi>r</mi><mi>k</mi></msup>
        <mo>=</mo>
        <mfrac>
          <mrow><mn>1</mn><mo>-</mo><msup><mi>r</mi><mi>n</mi></msup></mrow>
          <mrow><mn>1</mn><mo>-</mo><mi>r</mi></mrow>
        </mfrac>
        <mo>,</mo>
        <mspace width="0.5em"/>
        <mi>r</mi>
        <mo>&#x2260;</mo>
        <mn>1</mn>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <msub><mi>S</mi><mo>&#x221E;</mo></msub>
        <mo>=</mo>
        <munder>
          <mo>&#x2211;</mo>
          <mrow><mi>k</mi><mo>=</mo><mn>0</mn></mrow>
        </munder>
        <msup><mi>r</mi><mi>k</mi></msup>
        <mo>=</mo>
        <mfrac>
          <mn>1</mn>
          <mrow><mn>1</mn><mo>-</mo><mi>r</mi></mrow>
        </mfrac>
        <mo>,</mo>
        <mspace width="0.5em"/>
        <mo stretchy="false">|</mo><mi>r</mi><mo stretchy="false">|</mo>
        <mo>&lt;</mo>
        <mn>1</mn>
      </mtd>
    </mtr>
  </mtable>
</math>

RMSE, where <math><msubsup><mi>e</mi><mi>i</mi><mn>2</mn></msubsup><mo>=</mo><msup><mrow><mo>(</mo><msub><mi>y</mi><mi>i</mi></msub><mo>-</mo><msub><mover><mi>y</mi><mo>^</mo></mover><mi>i</mi></msub><mo>)</mo></mrow><mn>2</mn></msup></math> and capacity grows as <math><msup><mn>2</mn><mrow><mi>N</mi><mo>-</mo><mn>1</mn></mrow></msup></math>:

<math display="block">
  <mtable columnalign="left">
    <mtr>
      <mtd>
        <mtext>RMSE</mtext>
        <mo>=</mo>
        <msqrt>
          <mfrac>
            <mn>1</mn>
            <mi>N</mi>
          </mfrac>
          <munder>
            <mo>&#x2211;</mo>
            <mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow>
          </munder>
          <msup>
            <mrow>
              <mo>(</mo>
              <msub><mi>y</mi><mi>i</mi></msub>
              <mo>-</mo>
              <msub><mover><mi>y</mi><mo>^</mo></mover><mi>i</mi></msub>
              <mo>)</mo>
            </mrow>
            <mn>2</mn>
          </msup>
        </msqrt>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <mtext>NRMSE</mtext>
        <mo>=</mo>
        <mn>100</mn>
        <mo>&#x22C5;</mo>
        <msqrt>
          <mfrac>
            <mn>1</mn>
            <msup><mi>N</mi><mn>2</mn></msup>
          </mfrac>
          <munder>
            <mo>&#x2211;</mo>
            <mrow><mi>i</mi><mo>,</mo><mi>j</mi></mrow>
          </munder>
          <msup>
            <mrow>
              <mo>(</mo>
              <mfrac>
                <mrow><msub><mi>c</mi><mrow><mi>i</mi><mo>,</mo><mi>j</mi></mrow></msub><mo>-</mo><mtext>expected</mtext></mrow>
                <mtext>expected</mtext>
              </mfrac>
              <mo>)</mo>
            </mrow>
            <mn>2</mn>
          </msup>
        </msqrt>
      </mtd>
    </mtr>
  </mtable>
</math>

Some inline bitwise stuff:

- <math><mi>a</mi><mo>&#x2295;</mo><mi>b</mi><mo>&#x2295;</mo><mi>b</mi><mo>=</mo><mi>a</mi></math>
- <math><mi>x</mi><mspace width="0.3em"/><mo>&amp;</mo><mspace width="0.3em"/><mo stretchy="false">(</mo><msup><mn>2</mn><mi>k</mi></msup><mo>-</mo><mn>1</mn><mo stretchy="false">)</mo><mo>&#x2261;</mo><mi>x</mi><mspace width="0.5em"/><mo>(</mo><mtext>mod</mtext><mspace width="0.3em"/><msup><mn>2</mn><mi>k</mi></msup><mo>)</mo></math>
- <math><mo>-</mo><mi>x</mi><mo>=</mo><mo>&#x00AC;</mo><mi>x</mi><mo>+</mo><mn>1</mn></math>
- <math><mi>x</mi><mo>&lt;&lt;</mo><mi>k</mi><mo>=</mo><mi>x</mi><mo>&#x22C5;</mo><msup><mn>2</mn><mi>k</mi></msup></math>
- <math><mi>x</mi><mo>&gt;&gt;</mo><mi>k</mi><mo>=</mo><mo>&#x230A;</mo><mi>x</mi><mo>/</mo><msup><mn>2</mn><mi>k</mi></msup><mo>&#x230B;</mo></math>
