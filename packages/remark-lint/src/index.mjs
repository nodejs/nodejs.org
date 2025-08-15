import remarkGfm from 'remark-gfm';
import remarkLintBlockquoteIndentation from 'remark-lint-blockquote-indentation';
import remarkLintCheckboxCharacterStyle from 'remark-lint-checkbox-character-style';
import remarkLintCheckboxContentIndent from 'remark-lint-checkbox-content-indent';
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style';
import remarkLintDefinitionSpacing from 'remark-lint-definition-spacing';
import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker';
import remarkLintFinalDefinition from 'remark-lint-final-definition';
import remarkLintHeadingStyle from 'remark-lint-heading-style';
import remarkLintNoConsecutiveBlankLines from 'remark-lint-no-consecutive-blank-lines';
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes';
import remarkLintNofileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes';
import remarkLintNoHeadingIndent from 'remark-lint-no-heading-indent';
import remarkLintNoLiteralURLs from 'remark-lint-no-literal-urls';
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings';
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars';
import remarkLintNoTableIndentation from 'remark-lint-no-table-indentation';
import remarkLintNoTabs from 'remark-lint-no-tabs';
import remarkLintNoTrailingSpaces from 'remark-lint-no-trailing-spaces';
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions';
import remarkLintRuleStyle from 'remark-lint-rule-style';
import remarkLintStrongMarker from 'remark-lint-strong-marker';
import remarkLintTableCellPadding from 'remark-lint-table-cell-padding';
import remarkLintTablePipes from 'remark-lint-table-pipes';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';

export default {
  settings: {
    tightDefinitions: true,
    emphasis: '_',
    bullet: '-',
    rule: '-',
  },
  plugins: [
    // Enable GitHub Flavored Markdown
    remarkGfm,

    // Base plugins
    remarkPresetLintRecommended,

    // Blockquote and list rules
    [remarkLintBlockquoteIndentation, 2],
    [remarkLintCheckboxCharacterStyle, { checked: 'x', unchecked: ' ' }],
    remarkLintCheckboxContentIndent,

    // Code and formatting rules
    [remarkLintCodeBlockStyle, 'fenced'],
    [remarkLintFencedCodeMarker, '`'],
    [remarkLintRuleStyle, '---'],
    [remarkLintStrongMarker, '*'],

    // File and filename rules
    remarkLintNoFileNameConsecutiveDashes,
    remarkLintNofileNameOuterDashes,

    // Heading and link rules
    remarkLintFinalDefinition,
    [remarkLintNoUnusedDefinitions, false],
    [remarkLintNoLiteralURLs, false],
    [remarkLintHeadingStyle, 'atx'],
    remarkLintNoHeadingIndent,
    remarkLintNoMultipleToplevelHeadings,

    // Layout and spacing rules
    remarkLintDefinitionSpacing,
    remarkLintNoConsecutiveBlankLines,
    remarkLintNoTableIndentation,
    remarkLintNoTabs,
    remarkLintNoTrailingSpaces,
    [remarkLintTableCellPadding, 'padded'],
    remarkLintTablePipes,

    // Shell and console rules
    remarkLintNoShellDollars,
  ],
};
