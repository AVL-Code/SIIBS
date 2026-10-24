const ALLOWED_TYPES = ['feat', 'fix', 'docs', 'refactor', 'test', 'chore'];
const ALLOWED_SCOPES = [
  'registry',
  'assistance',
  'iam',
  'audit',
  'education',
  'db',
  'backup',
  'ui',
  'spec',
  'shared',
];

const SDD_HEADER_REGEX = new RegExp(
  `^(${ALLOWED_TYPES.join('|')})\\((${ALLOWED_SCOPES.join('|')})\\): [a-z].+ \\[[A-Za-z0-9-_,\\s§.]+\\] \\(#[0-9]+\\)$`,
);

export default {
  plugins: [
    {
      rules: {
        'sdd-header-format': (parsed) => {
          const header = (parsed.header ?? '').trim();
          if (header.startsWith('Merge ')) {
            return [true];
          }
          const isValid = SDD_HEADER_REGEX.test(header);
          return [
            isValid,
            `Commit message must match SDD convention (11-tech-spec.md §6.5):\n` +
              `  <type>(<scope>): <imperative summary in english> [spec-ref] (#<issue-#>)\n` +
              `  Allowed types:  ${ALLOWED_TYPES.join(', ')}\n` +
              `  Allowed scopes: ${ALLOWED_SCOPES.join(', ')}\n` +
              `  Example: feat(registry): implement person search and record reuse [RF-01, RF-03] (#12)`,
          ];
        },
      },
    },
  ],
  rules: {
    'sdd-header-format': [2, 'always'],
  },
};

