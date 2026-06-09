class CompensationCalculator {
	calculateTotalCompForYear(comp, year = 0, yearlySalaryIncreasePercent = 0) {
		let sign_in_bonus = year == 0 ? comp.sign_in_bonus : 0;
		let cash_multiplier = Math.pow(1 + yearlySalaryIncreasePercent / 100, year);
		let cash = comp.salary * (1 + comp.bonus_target / 100) * cash_multiplier;
		let has_initial_rsu_percentages = comp.rsu_initial_grant_yearly_percentages &&
			(Array.isArray(comp.rsu_initial_grant_yearly_percentages) || typeof comp.rsu_initial_grant_yearly_percentages.length === 'number') &&
			comp.rsu_initial_grant_yearly_percentages.length > 0;

		let initial_rsu_this_year = 0;
		if (has_initial_rsu_percentages) {
			if (year < comp.rsu_initial_grant_yearly_percentages.length) {
				let pct = comp.rsu_initial_grant_yearly_percentages[year];
				initial_rsu_this_year = comp.rsu * (pct / 100);
			}
		} else {
			initial_rsu_this_year =
				(year < comp.rsu_vesting_over_years) ?
					comp.rsu / comp.rsu_vesting_over_years
					: 0;
		}

		let has_refresh_percentages = comp.rsu_refresh_yearly_percentages &&
			(Array.isArray(comp.rsu_refresh_yearly_percentages) || typeof comp.rsu_refresh_yearly_percentages.length === 'number') &&
			comp.rsu_refresh_yearly_percentages.length > 0;

		let refreshed_rsu_this_year = 0;
		if (year > 0) {
			if (has_refresh_percentages) {
				for (let y = 1; y <= year; y++) {
					let age = year - y;
					if (age < comp.rsu_refresh_yearly_percentages.length) {
						let pct = comp.rsu_refresh_yearly_percentages[age];
						refreshed_rsu_this_year += comp.expected_yearly_rsu_refresh * (pct / 100);
					}
				}
			} else {
				refreshed_rsu_this_year =
					Math.max(year, comp.rsu_vesting_over_years) * comp.expected_yearly_rsu_refresh / comp.rsu_vesting_over_years;
			}
		}

		return sign_in_bonus + cash + initial_rsu_this_year + refreshed_rsu_this_year;
	}

	calculateTotalCompRow(comp, numberOfYears = 5, yearlySalaryIncreasePercent = 0) {
		let row = [];
		for (let i = 0; i < numberOfYears; i++) {
			row.push(
				(Math.trunc(this.calculateTotalCompForYear(comp, i, yearlySalaryIncreasePercent) * 1000)));
		}
		return row;
	}

	formatRowsForTable(rows, nonCompColumns = 1) {
		return rows.map((row) => {
			let nonComp = [];
			if (nonCompColumns == 1) {
				nonComp = [row[0]];
			} else if (nonCompColumns > 1) {
				nonComp = row.slice(0, nonCompColumns);
			}
			return nonComp.concat(row.slice(nonCompColumns).map((it) => it.toLocaleString()));
		});
	}

	getChartYaml(header, rows, startOfYearColumns = 1) {
		let series = rows.map((row) => {
			let title = row[0];
			let data = row.slice(startOfYearColumns);
			return `    - title: ${title}\n      data: [${data}]`
		}).join("\n");

		let labels = header.slice(startOfYearColumns)

		let result = "```chart\n" +
			"  type: line\n" +
			"  labels: [" + labels + "]\n" +
			"  series:\n" + series;
		return result;
	}

	generateCompensationTableForJobPage(dv, numberOfYears = 5, yearlySalaryIncreasePercents = [0, 2, 2.5, 3, 3.5, 4, 4.5]) {
		let header = ["Salary Bump %"];
		for (let i = 1; i <= numberOfYears; i++) {
			header.push(`Year ${i}`);
		}
		let rows = [];

		for (let bumpPercent of yearlySalaryIncreasePercents) {
			let row = [`${bumpPercent}`]
				.concat(this.calculateTotalCompRow(dv.current().comp, numberOfYears, bumpPercent));
			rows.push(row);
		}
		let tableRows = this.formatRowsForTable(rows);
		dv.table(header, tableRows);

		dv.paragraph(this.getChartYaml(header, rows));
	}

	generateCompensationSummariesForQuery(dv, queryResult, numberOfYears = 5, yearlySalaryIncreasePercent = 0) {
		let header = ["Job", "Level", "Status"];
		for (let i = 1; i <= numberOfYears; i++) {
			header.push(`Year ${i}`);
		}
		let rows = [];

		for (let page of queryResult) {
			let row = [page.file.name, dv.fileLink(page.file.path), page.level, page.status]
				.concat(this.calculateTotalCompRow(page.comp, numberOfYears, yearlySalaryIncreasePercent));
			rows.push(row);
		}
		let tableRows = this.formatRowsForTable(rows.map((row) => row.slice(1)), 3);
		dv.table(header, tableRows);

		let chartRows = rows.map((row) => [row[0]].concat(row.slice(2)))
		let chartData = this.getChartYaml(header, chartRows, 3);
		dv.paragraph(chartData);
	}

}
