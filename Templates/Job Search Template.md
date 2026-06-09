---
tags: 
level: 
sourcer: 
sourcer_email: 
comp:
  sign_in_bonus: 0
  salary: 0
  bonus_target: 15
  rsu: 0
  rsu_vesting_months: 6
  rsu_vesting_cliff_months: 12
  rsu_vesting_over_years: 4
  rsu_initial_grant_yearly_percentages: []
  rsu_refresh_yearly_percentages: []
  expected_yearly_rsu_refresh: 0
team: 
result_date: 
screen_date: 
onsite_date: 
recruiter: 
recruiter_email: 
coordinator: 
coordinator_email: 
url: 
active: true
---

# <% tp.file.title %>
#job_search 
```dataviewjs
const {LinkCreator} = customJS;
let page = dv.current()
let parts = [page.level, page.team].filter(Boolean);
let name = parts.length > 0 ? parts.join(" - ") : page.file.name;

dv.list([LinkCreator.createLinkWithTitle(name, page.url)])
```

## Compensation


```dataviewjs
const {CompensationCalculator} = customJS;
CompensationCalculator.generateCompensationTableForJobPage(dv)
```
