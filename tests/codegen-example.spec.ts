import { test, expect } from '@playwright/test';

test('Codegen example - Recording step by step', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByPlaceholder('Pesquisar').click();
  await page.getByPlaceholder('Pesquisar').fill('colozzotech');
  await page.getByPlaceholder('Pesquisar').press('Enter');
  await page.getByPlaceholder('Pesquisar').dblclick();
  await page.getByPlaceholder('Pesquisar').dblclick();
  await page.getByPlaceholder('Pesquisar').fill('anto');
  await page.getByPlaceholder('Pesquisar').press('Control+a');
  await page.getByPlaceholder('Pesquisar').fill('colozzo');
  await page.getByText('antonio colozzo').click();
  await page.locator('#search-form #container').dblclick();
  await page.getByPlaceholder('Pesquisar').click();
  await page.getByPlaceholder('Pesquisar').fill('startqa marcos franco');
  await page.getByPlaceholder('Pesquisar').press('Enter');
  await page.getByRole('link', { name: 'Marcos Franco - Start QA Marcos Franco - Start QA @startqa•588 inscritos Marcos Franco ‍ - QA Engineer / Engenheiro de software em Testes - Conteúdos da área de Qualidade de Software e ...' }).click();
  await page.locator('#c4-player video').click();
  await page.getByRole('heading', { name: 'Marcos Franco - Start QA', exact: true }).locator('span').click();
});