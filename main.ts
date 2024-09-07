import { App, Plugin, PluginSettingTab, Setting, Modal, Notice, TFile } from 'obsidian';
import Chart from 'chart.js/auto';

interface FinancialManagementSettings {
  currency: string;
}

const DEFAULT_SETTINGS: FinancialManagementSettings = {
  currency: 'CNY'
}

export default class FinancialManagementPlugin extends Plugin {
  settings: FinancialManagementSettings;

  async onload() {
    await this.loadSettings();

    this.addRibbonIcon('fish-off', 'Financial Management Charts', () => {
      new FinancialChartModal(this.app, this).open();
    });

    this.addSettingTab(new FinancialManagementSettingTab(this.app, this));
  }

  onunload() {
    // Cleanup when the plugin is disabled
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async updateFinancialData(filePath: string, newCurrency: string, newExpenses: number[]) {
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file && file instanceof TFile) {
      const content = await this.app.vault.read(file);
      const updatedContent = content.replace(/Currency: .*/, `Currency: ${newCurrency}`)
                                    .replace(/Expenses: .*/, `Expenses: ${newExpenses.join(', ')}`);
      await this.app.vault.modify(file, updatedContent);
      new Notice('Financial data updated successfully!');
    } else {
      new Notice('File not found!');
    }
  }
}

class FinancialChartModal extends Modal {
  private months: string[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  private physiologicalExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private safetyExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private belonging_loveExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private esteemExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private cognitiveExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private aestheticExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private self_actualizationExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private transcendenceExpenses: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];

  private wageIncome: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private operationalIncome: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private propertyIncome: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];
  private transferIncome: number[] = [100, 80, 60, 120, 150, 100, 80, 60, 120, 150, 100, 80];

  private budget: number[] = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300]; // Define budget data
  private chart: Chart;
  private pieChart1: Chart;
  private pieChart2: Chart;

  private colors = {
    food: 'rgba(255, 99, 132, 0.2)',
    shopping: 'rgba(54, 162, 235, 0.2)',
    scholarship: 'rgba(75, 192, 192, 0.2)',
    partTime: 'rgba(153, 102, 255, 0.2)',
    budget: 'rgba(255, 111, 49, 0.2)',

	physiological: 'rgba(0,48,90, 0.2)',
	safety: 'rgba(0,75,141, 0.2)',
	belonging_love: 'rgba(0,116,217, 0.2)',
	esteem: 'rgba(65,146,217, 0.2)',
	cognitive: 'rgba(122,186,242, 0.2)',
	aesthetic: 'rgba(120,198,242, 0.2)',
	self_actualization: 'rgba(120,236,242, 0.2)',
	transcendence: 'rgba(120,242,213, 0.2)',

	wage: 'rgba(85,34,51, 0.2)',
	operational: 'rgba(170,51,102, 0.2)',
	property: 'rgba(204,85,153, 0.2)',
	transfer: 'rgba(221,153,204, 0.2)',
  };

  constructor(app: App, private plugin: FinancialManagementPlugin) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Financial Charts' });

    const layoutContainer = contentEl.createEl('div', { cls: 'layout-container' });

    const chartContainer = layoutContainer.createEl('div', { cls: 'chart-container' });

    const canvas = chartContainer.createEl('canvas');
    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Budget',
            data: this.budget,
            backgroundColor: this.colors.budget,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            type: 'line', // Display budget as a line
            fill: false,
            borderDash: [5, 5] // Dashed line for budget
          },
		  {
			label: 'physiological',
			data: this.physiologicalExpenses,
			backgroundColor: this.colors.physiological,
			borderColor: 'rgba(0,48,90, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'safety',
			data: this.safetyExpenses,
			backgroundColor: this.colors.safety,
			borderColor: 'rgba(0,75,141, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'belonging_love',
			data: this.belonging_loveExpenses,
			backgroundColor: this.colors.belonging_love,
			borderColor: 'rgba(0,116,217, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'esteem',
			data: this.esteemExpenses,
			backgroundColor: this.colors.esteem,
			borderColor: 'rgba(65,146,217, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'cognitive',
			data: this.cognitiveExpenses,
			backgroundColor: this.colors.cognitive,
			borderColor: 'rgba(122,186,242, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'aesthetic',
			data: this.aestheticExpenses,
			backgroundColor: this.colors.aesthetic,
			borderColor: 'rgba(120,198,242, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'self_actualization',
			data: this.self_actualizationExpenses,
			backgroundColor: this.colors.self_actualization,
			borderColor: 'rgba(120,236,242, 1)',
			borderWidth : 1,
		  },
		  {
			label : 'transcendence',
			data: this.transcendenceExpenses,
			backgroundColor: this.colors.transcendence,
			borderColor: 'rgba(120,242,213, 1)',
			borderWidth : 1,
		  },
		  {
			label: 'wage',
			data: this.wageIncome,
			backgroundColor: this.colors.wage,
			borderColor: 'rgba(85,34,51, 1)',
			borderWidth: 1,
			stack: 'income'
		  },
		  {
			label: 'operational',
			data: this.operationalIncome,
			backgroundColor: this.colors.operational,
			borderColor: 'rgba(170,51,102, 1)',
			borderWidth: 1,
			stack: 'income'
		  },
		  {
			label: 'property',
			data: this.propertyIncome,
			backgroundColor: this.colors.property,
			borderColor: 'rgba(204,85,153, 1)',
			borderWidth: 1,
			stack: 'income'
		  },
		  {
			label: 'transfer',
			data: this.transferIncome,
			backgroundColor: this.colors.transfer,
			borderColor: 'rgba(221,153,204, 1)',
			borderWidth: 1,
			stack: 'income'
		  },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stacked: true // Enable stacking for y-axis
          },
          x: {
            stacked: true // Enable stacking for x-axis
          }
        }
      }
    });

    const pieContainer = layoutContainer.createEl('div', { cls: 'pie-container' });

    const pieCanvas1 = pieContainer.createEl('canvas');
    const pieCtx1 = pieCanvas1.getContext('2d');

    this.pieChart1 = new Chart(pieCtx1, {
      type: 'pie',
      data: {
        labels: ['physiological', 'safety', 'belonging_love', 'esteem', 'cognitive', 'aesthetic', 'self_actualization', 'transcendence'],
        datasets: [{
          data: [
            this.physiologicalExpenses.reduce((a, b) => a + b, 0),
			this.safetyExpenses.reduce((a, b) => a + b, 0),
			this.belonging_loveExpenses.reduce((a, b) => a + b, 0),
			this.esteemExpenses.reduce((a, b) => a + b, 0),
			this.cognitiveExpenses.reduce((a, b) => a + b, 0),
			this.aestheticExpenses.reduce((a, b) => a + b, 0),
			this.self_actualizationExpenses.reduce((a, b) => a + b, 0),
			this.transcendenceExpenses.reduce((a, b) => a + b, 0),
          ],
          backgroundColor: [
            this.colors.physiological,
			this.colors.safety,
			this.colors.belonging_love,
			this.colors.esteem,
			this.colors.cognitive,
			this.colors.aesthetic,
			this.colors.self_actualization,
			this.colors.transcendence,
          ]
        }]
      }
    });

	// Calculate total expenses
	// const totalExpenses = [
	// 	...this.physiologicalExpenses,
	// 	...this.safetyExpenses,
	// 	...this.belonging_loveExpenses,
	// 	...this.esteemExpenses,
	// 	...this.cognitiveExpenses,
	// 	...this.aestheticExpenses,
	// 	...this.self_actualizationExpenses,
	// 	...this.transcendenceExpenses
	// 	].reduce((a, b) => a + b, 0);
    // const totalExpensesEl = pieContainer.createEl('div', { cls: 'total-expenses' });
    // totalExpensesEl.textContent = `Total Expenses This Year: ${totalExpenses}`;
    const pieCanvas2 = pieContainer.createEl('canvas');
    const pieCtx2 = pieCanvas2.getContext('2d');

    this.pieChart2 = new Chart(pieCtx2, {
      type: 'pie',
      data: {
        labels: ['wage', 'operational', 'property', 'transfer'],
        datasets: [{
          data: [
			this.wageIncome.reduce((a, b) => a + b, 0),
			this.operationalIncome.reduce((a, b) => a + b, 0),
			this.propertyIncome.reduce((a, b) => a + b, 0),
			this.transferIncome.reduce((a, b) => a + b, 0),
          ],
          backgroundColor: [
			this.colors.wage,
			this.colors.operational,
			this.colors.property,
			this.colors.transfer,
          ]
        }]
      }
    });

		// Calculate total expenses
		// const totalIncome = [
		// 	...this.wageIncome,
		// 	...this.operationalIncome,
		// 	...this.propertyIncome,
		// 	...this.transferIncome
		// 	].reduce((a, b) => a + b, 0);
		// const totalIncomeEl = pieContainer.createEl('div', { cls: 'total-income' });
		// totalIncomeEl.textContent = `Total Income This Year: ${totalIncome}`;


    this.createLayout(contentEl);
  }

  createLayout(containerEl: HTMLElement) {
    const layoutContainer = containerEl.createEl('div', { cls: 'layout-container' });

    const tabContainer = layoutContainer.createEl('div', { cls: 'tab-container' });
    const contentContainer = layoutContainer.createEl('div', { cls: 'content-container' });

    this.months.forEach((month, index) => {
      const tabButton = tabContainer.createEl('button', { text: month, cls: 'tab-button' });
      tabButton.addEventListener('click', () => {
        this.showTabContent(contentContainer, index);
      });
    });

    // Initially show the first month's content
	this.showTabContent(contentContainer, 0);
	  }
	
	  showTabContent(containerEl: HTMLElement, monthIndex: number) {
		containerEl.findAll('.tab-content').forEach(el => el.remove());
	
		const tabContent = containerEl.createEl('div', { cls: 'tab-content' });
	
		// Create containers for expenses and incomes
		const expensesContainer = tabContent.createEl('div', { cls: 'expenses-container' });
		const incomesContainer = tabContent.createEl('div', { cls: 'incomes-container' });
	
		// Add expense settings
		const physiologicalSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Physiological Expense`)
		  .setDesc(`Basic survival needs like food, water, shelter, sleep.`)
		  .addText(text => text
			.setPlaceholder('Enter physiological expense')
			.setValue(this.physiologicalExpenses[monthIndex].toString())
			.onChange(value => {
			  this.physiologicalExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		physiologicalSetting.settingEl.style.backgroundColor = this.colors.physiological;

		const safetySetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Safety Expense`)
		  .setDesc(`Security, protection from harm, stability, and order.`)
		  .addText(text => text
			.setPlaceholder('Enter safety expense')
			.setValue(this.safetyExpenses[monthIndex].toString())
			.onChange(value => {
			  this.safetyExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		safetySetting.settingEl.style.backgroundColor = this.colors.safety;

		const belonging_loveSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Belonging_love Expense`)
		  .setDesc(`Relationships, friendships, affection, and social connections.`)
		  .addText(text => text
			.setPlaceholder('Enter belonging_love expense')
			.setValue(this.belonging_loveExpenses[monthIndex].toString())
			.onChange(value => {
			  this.belonging_loveExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		belonging_loveSetting.settingEl.style.backgroundColor = this.colors.belonging_love;

		const esteemSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Esteem Expense`)
		  .setDesc(`Respect, recognition, self-worth, achievement, and confidence.`)
		  .addText(text => text
			.setPlaceholder('Enter esteem expense')
			.setValue(this.esteemExpenses[monthIndex].toString())
			.onChange(value => {
			  this.esteemExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		esteemSetting.settingEl.style.backgroundColor = this.colors.esteem;

		const cognitiveSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Cognitive Expense`)
		  .setDesc(`Knowledge, understanding, curiosity, and intellectual exploration.`)
		  .addText(text => text
			.setPlaceholder('Enter cognitive expense')
			.setValue(this.cognitiveExpenses[monthIndex].toString())
			.onChange(value => {
			  this.cognitiveExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		cognitiveSetting.settingEl.style.backgroundColor = this.colors.cognitive;

		const aestheticSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Aesthetic Expense`)
		  .setDesc(`Beauty, balance, harmony, and appreciation of art.`)
		  .addText(text => text
			.setPlaceholder('Enter aesthetic expense')
			.setValue(this.aestheticExpenses[monthIndex].toString())
			.onChange(value => {
			  this.aestheticExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		aestheticSetting.settingEl.style.backgroundColor = this.colors.aesthetic;

		const self_actualizationSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Self_actualization Expense`)
		  .setDesc(`Personal growth, reaching full potential, self-fulfillment.`)
		  .addText(text => text
			.setPlaceholder('Enter self_actualization expense')
			.setValue(this.self_actualizationExpenses[monthIndex].toString())
			.onChange(value => {
			  this.self_actualizationExpenses[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		self_actualizationSetting.settingEl.style.backgroundColor = this.colors.self_actualization;

		const transcendenceSetting = new Setting(expensesContainer)
		  .setName(`${this.months[monthIndex]} Transcendence Expense`)
		  .setDesc(`Helping others, spiritual connection, purpose beyond self.`)
		  .addText(text => text
			.setPlaceholder('Enter transcendence expense')
			.setValue(this.transcendenceExpenses[monthIndex].toString())
			.onChange(value => {
			  this.transcendenceExpenses[monthIndex] = parseFloat(value) || 0;
			}))
			.addButton(button => button
				.setButtonText('Update')
				.onClick(() => {
					this.updateChart();
				}));
		transcendenceSetting.settingEl.style.backgroundColor = this.colors.transcendence;


		// Add income settings
		const wageSetting = new Setting(incomesContainer)
		  .setName(`${this.months[monthIndex]} Wage Income`)
		  .setDesc(`Earnings from employment or labor, including salaries.`)
		  .addText(text => text
			.setPlaceholder('Enter wage income')
			.setValue(this.wageIncome[monthIndex].toString())
			.onChange(value => {
			  this.wageIncome[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		wageSetting.settingEl.style.backgroundColor = this.colors.wage;

		const operationalSetting = new Setting(incomesContainer)
		  .setName(`${this.months[monthIndex]} Operational Income`)
		  .setDesc(`Profits from business activities or services rendered.`)
		  .addText(text => text
			.setPlaceholder('Enter operational income')
			.setValue(this.operationalIncome[monthIndex].toString())
			.onChange(value => {
			  this.operationalIncome[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		operationalSetting.settingEl.style.backgroundColor = this.colors.operational;

		const propertySetting = new Setting(incomesContainer)
		  .setName(`${this.months[monthIndex]} Property Income`)
		  .setDesc(`Earnings from owning assets like rent, interest, dividends.`)
		  .addText(text => text
			.setPlaceholder('Enter property income')
			.setValue(this.propertyIncome[monthIndex].toString())
			.onChange(value => {
			  this.propertyIncome[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		propertySetting.settingEl.style.backgroundColor = this.colors.property;

		const transferSetting = new Setting(incomesContainer)
		  .setName(`${this.months[monthIndex]} Transfer Income`)
		  .setDesc(`Payments from government or others without work exchange.`)
		  .addText(text => text
			.setPlaceholder('Enter transfer income')
			.setValue(this.transferIncome[monthIndex].toString())
			.onChange(value => {
			  this.transferIncome[monthIndex] = parseFloat(value) || 0;
			}))
		  .addButton(button => button
			.setButtonText('Update')
			.onClick(() => {
			  this.updateChart();
			}));
		transferSetting.settingEl.style.backgroundColor = this.colors.transfer;

		const budgetSetting = new Setting(incomesContainer)
		.setName(`${this.months[monthIndex]} Budget`)
		.setDesc(`Set the budget for ${this.months[monthIndex]}`)
		.addText(text => text
		  .setPlaceholder('Enter budget')
		  .setValue(this.budget[monthIndex].toString())
		  .onChange(value => {
			this.budget[monthIndex] = parseFloat(value) || 0;
		  }))
		.addButton(button => button
		  .setButtonText('Update')
		  .onClick(() => {
			this.updateChart();
		  }));
	  budgetSetting.settingEl.style.backgroundColor = this.colors.budget;
	  }
  updateChart() {
    this.chart.data.labels = this.months;
	this.chart.data.datasets[0].data = this.budget;
	this.chart.data.datasets[1].data = this.physiologicalExpenses;
	this.chart.data.datasets[2].data = this.safetyExpenses;
	this.chart.data.datasets[3].data = this.belonging_loveExpenses;
	this.chart.data.datasets[4].data = this.esteemExpenses;
	this.chart.data.datasets[5].data = this.cognitiveExpenses;
	this.chart.data.datasets[6].data = this.aestheticExpenses;
	this.chart.data.datasets[7].data = this.self_actualizationExpenses;
	this.chart.data.datasets[8].data = this.transcendenceExpenses;
	this.chart.data.datasets[9].data = this.wageIncome;
	this.chart.data.datasets[10].data = this.operationalIncome;
	this.chart.data.datasets[11].data = this.propertyIncome;
	this.chart.data.datasets[12].data = this.transferIncome;
	// this.chart.data.datasets[13].data = this.budget
    this.chart.update();

    this.pieChart1.data.datasets[0].data = [
      this.physiologicalExpenses.reduce((a, b) => a + b, 0),
      this.safetyExpenses.reduce((a, b) => a + b, 0),
      this.belonging_loveExpenses.reduce((a, b) => a + b, 0),
      this.esteemExpenses.reduce((a, b) => a + b, 0),
	  this.cognitiveExpenses.reduce((a, b) => a + b, 0),
	  this.aestheticExpenses.reduce((a, b) => a + b, 0),
	  this.self_actualizationExpenses.reduce((a, b) => a + b, 0),
	  this.transcendenceExpenses.reduce((a, b) => a + b, 0),
    ];
    this.pieChart1.update();

    this.pieChart2.data.datasets[0].data = [
      this.wageIncome.reduce((a, b) => a + b, 0),
      this.operationalIncome.reduce((a, b) => a + b, 0),
      this.propertyIncome.reduce((a, b) => a + b, 0),
	  this.transferIncome.reduce((a, b) => a + b, 0),
    ];
    this.pieChart2.update();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

class FinancialManagementSettingTab extends PluginSettingTab {
  plugin: FinancialManagementPlugin;

  constructor(app: App, plugin: FinancialManagementPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'Financial Management Settings' });

    new Setting(containerEl)
      .setName('Currency')
      .setDesc('The currency to use for financial data.')
      .addText(text => text
        .setPlaceholder('Enter your currency')
        .setValue(this.plugin.settings.currency)
        .onChange(async (value) => {
          this.plugin.settings.currency = value;
          await this.plugin.saveSettings();
        }));
  }
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
  .layout-container {
    display: flex;
  }
  .chart-container {
    flex: 2;
  }
  .pie-container {
    display: flex;
    flex-direction: column;
    flex: 0.5;
    justify-content: space-around;
  }
  .tab-container {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  .tab-button {
    margin: 5px 0;
  }
  .content-container {
    flex-grow: 1;
  }
  .tab-content {
  display: flex;
  justify-content: space-between;
  }
  
  .expenses-container, .incomes-container {
  width: 48%; 
  }
  
  .setting-item {
  margin-bottom: 5px;
  }
`;
document.head.appendChild(style);