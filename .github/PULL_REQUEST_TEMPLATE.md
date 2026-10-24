Closes #<issue-#>

## Summary of Changes

-

## Definition of Done Checklist

- [ ] Linked to SDD requirements and Issue (`#<issue-#>`).
- [ ] Backend authorization enforced in service layer (`PermissionGuard`).
- [ ] Atomic PostgreSQL transaction for domain change + `AuditEvent`.
- [ ] No sensitive `assistance` data leaked into `registry` contracts.
- [ ] Unit & PostgreSQL integration tests passing (`npm test`).
- [ ] Linter and TypeScript strict typecheck passing (`npm run lint` & `npm run typecheck`).
