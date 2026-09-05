'use client'

import { useEffect, useMemo, useState } from 'react'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const accounts = [
  { id: 'kelly-amazon', eyebrow: 'Amazon KDP', name: 'Kelly Marques', tone: 'blue', short: 'Amazon · Kelly' },
  { id: 'gilberto-amazon', eyebrow: 'Amazon KDP', name: 'Gilberto De Souza', tone: 'bronze', short: 'Amazon · Gilberto' },
  { id: 'kelly-barnes', eyebrow: 'Barnes & Noble Press', name: 'Kelly Marques', tone: 'sage', short: 'Barnes · Kelly' },
]

const kellyMonthly = [
  { month: 'Maio/2026', ebook: 0, print: 6, total: 6, royalty: 53.12, payout: '29/07/2026', status: 'Pago' },
  { month: 'Junho/2026', ebook: 1, print: 6, total: 7, royalty: 87.53, payout: '29/08/2026', status: 'Pago' },
  { month: 'Julho/2026', ebook: 0, print: 3, total: 3, royalty: 38.07, payout: 'Fim de setembro/2026', status: 'No ciclo' },
  { month: 'Agosto/2026', ebook: 0, print: 5, total: 5, royalty: 67.11, payout: 'Fim de outubro/2026', status: 'No ciclo' },
]

const kellyTitles = [
  { title: 'Guía Completa de Impuestos para Inmigrantes en EE. UU.', ebook: 1, print: 10, units: 11, royalty: 133.88 },
  { title: 'Antes Que Eu Entendesse Você Já Me Transformava', ebook: 0, print: 4, units: 4, royalty: 33.88 },
  { title: 'Guia Completo de Impostos para Imigrantes nos EUA', ebook: 0, print: 3, units: 3, royalty: 35.85 },
  { title: 'Complete Tax Guide for Immigrants in the USA', ebook: 0, print: 2, units: 2, royalty: 34.93 },
  { title: 'Before I Understood, You Were Already Transforming Me', ebook: 0, print: 1, units: 1, royalty: 7.29 },
]

const gilbertoTitles = [
  { title: 'Como Vencer a Dor de Ser Trocado Por Outro', format: 'Impresso', units: 2 },
  { title: 'Cómo Vencer el Dolor de Ser Reemplazado por Otro', format: 'eBook', units: 1 },
  { title: 'How to Overcome the Pain of Being Replaced by Someone Else', format: 'Impresso', units: 1 },
  { title: 'Superação — O seu futuro é você quem faz', format: 'Impresso', units: 1 },
]

const gilbertoPayouts = [
  { period: 'Maio/2026', source: 'Paperback Sales', amount: 12.55, paid: '29/07/2026', method: 'EFT' },
  { period: 'Junho/2026', source: 'Paperback Sales', amount: 25.17, paid: '29/08/2026', method: 'EFT' },
]

const barnesOrders = [
  { order: '5200012770', date: '21/05/2026', copies: 20, subtotal: 75.80, handling: 2.00, shipping: 15.00, tax: 4.74, total: 97.54 },
  { order: '5200013430', date: '26/05/2026', copies: 50, subtotal: 154.40, handling: 5.00, shipping: 30.00, tax: 9.65, total: 199.05 },
  { order: '5200014996', date: '04/06/2026', copies: 6, subtotal: 17.40, handling: 1.00, shipping: 8.00, tax: 1.09, total: 27.49 },
  { order: '5200025803', date: '10/08/2026', copies: 21, subtotal: 101.85, handling: 2.10, shipping: 15.50, tax: 6.37, total: 125.82 },
]

const barnesItems = [
  { order: '5200012770', title: 'Before I Understood, You Were Already Transforming Me', author: 'Kelly Marques', qty: 20, unit: 3.79, total: 75.80 },
  { order: '5200013430', title: 'Complete Tax Guide for Immigrants in the USA', author: 'Kelly Marques', qty: 15, unit: 2.60, total: 39.00 },
  { order: '5200013430', title: 'Guía Completa de Impuestos para Inmigrantes en EE.UU.', author: 'Kelly Marques', qty: 15, unit: 2.60, total: 39.00 },
  { order: '5200013430', title: 'Antes que eu entendesse, você já me transformava', author: 'Kelly Marques', qty: 20, unit: 3.82, total: 76.40 },
  { order: '5200014996', title: 'How to Overcome the Pain of Being Replaced by Someone Else', author: 'Gilberto De Souza', qty: 1, unit: 3.12, total: 3.12 },
  { order: '5200014996', title: 'Como Vencer a Dor de Ser Trocado Por Outro', author: 'Gilberto De Souza', qty: 1, unit: 3.21, total: 3.21 },
  { order: '5200014996', title: 'Cómo Vencer el Dolor de Ser Reemplazado por Otro', author: 'Gilberto De Souza', qty: 1, unit: 3.27, total: 3.27 },
  { order: '5200014996', title: 'Guía Completa de Impuestos para Inmigrantes en EE.UU.', author: 'Kelly Marques', qty: 3, unit: 2.60, total: 7.80 },
  { order: '5200025803', title: 'Superação', author: 'Gilberto De Souza', qty: 21, unit: 4.85, total: 101.85 },
]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.08 }
    )
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function Badge({ children, type = 'neutral' }) {
  return <span className={`badge badge-${type}`}>{children}</span>
}

function Metric({ label, value, detail }) {
  return (
    <article className="metric-card">
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-detail">{detail}</span>
    </article>
  )
}

function ScrollTable({ children, label }) {
  return (
    <div className="table-shell">
      <div className="table-toolbar">
        <span>{label}</span>
        <span className="scroll-hint">Arraste a tabela para o lado ↔</span>
      </div>
      <div className="table-scroll" tabIndex="0" aria-label={`${label}. Tabela com rolagem horizontal.`}>
        {children}
      </div>
    </div>
  )
}

function Bars({ data, valueKey, labelKey, formatter = v => usd.format(v) }) {
  const max = Math.max(...data.map(item => item[valueKey]), 1)
  return (
    <div className="bars" aria-label="Gráfico visual">
      {data.map(item => (
        <div className="bar-row" key={item[labelKey]}>
          <div className="bar-meta"><span>{item[labelKey]}</span><strong>{formatter(item[valueKey])}</strong></div>
          <div className="bar-track"><span className="bar-fill" style={{ width: `${Math.max(7, (item[valueKey] / max) * 100)}%` }} /></div>
        </div>
      ))}
    </div>
  )
}

function PayoutRoute({ children }) {
  return <div className="payout-route">{children}</div>
}

function AccountHeader({ eyebrow, name, note, tone }) {
  return (
    <div className={`account-heading tone-${tone}`}>
      <div><span className="eyebrow">{eyebrow}</span><h2>{name}</h2></div>
      <p>{note}</p>
    </div>
  )
}

function KellyAmazon() {
  return (
    <div className="account-view" data-reveal>
      <AccountHeader eyebrow="Amazon KDP · conta independente" name="Kelly Marques" tone="blue" note="Somente dados da Amazon KDP da Kelly. Nenhuma venda ou payout do Gilberto entra nos totais abaixo." />

      <div className="metrics-grid">
        <Metric label="Unidades vendidas" value="21" detail="1 eBook + 20 impressos" />
        <Metric label="Royalties gerados" value={usd.format(245.83)} detail="Maio a agosto de 2026" />
        <Metric label="Payouts já pagos" value={usd.format(140.65)} detail="Maio + junho" />
        <Metric label="Ainda no ciclo" value={usd.format(105.18)} detail="Julho + agosto" />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head"><div><span className="section-kicker">EVOLUÇÃO MENSAL</span><h3>Royalties por mês</h3></div><Badge type="blue">Amazon Kelly</Badge></div>
          <Bars data={kellyMonthly} valueKey="royalty" labelKey="month" />
        </section>
        <section className="panel payout-panel">
          <div className="panel-head"><div><span className="section-kicker">PAYOUT</span><h3>Para onde o dinheiro vai</h3></div><Badge type="blue">EFT</Badge></div>
          <dl className="definition-list">
            <div><dt>Forma de pagamento</dt><dd>EFT</dd></div>
            <div><dt>Pagamentos comprovados</dt><dd>29/07 e 29/08/2026</dd></div>
            <div><dt>Conta bancária de destino</dt><dd>Não aparece no screenshot de repasse fornecido</dd></div>
          </dl>
          <div className="notice notice-neutral">O arquivo “Screenshot repasse amazon conta kelly.png” comprova os payouts e o método EFT, mas não exibe banco nem final da conta. O relatório não atribui a ela a conta do Gilberto.</div>
        </section>
      </div>

      <ScrollTable label="Vendas e royalties por mês">
        <table>
          <thead><tr><th>Mês</th><th>eBook</th><th>Impresso</th><th>Total</th><th>Royalties</th><th>Status</th><th>Payout / previsão</th></tr></thead>
          <tbody>{kellyMonthly.map(row => <tr key={row.month}><td className="sticky-cell">{row.month}</td><td>{row.ebook}</td><td>{row.print}</td><td><strong>{row.total}</strong></td><td className="money">{usd.format(row.royalty)}</td><td><Badge type={row.status === 'Pago' ? 'success' : 'pending'}>{row.status}</Badge></td><td>{row.payout}</td></tr>)}</tbody>
          <tfoot><tr><td className="sticky-cell">TOTAL</td><td>1</td><td>20</td><td>21</td><td className="money">{usd.format(245.83)}</td><td colSpan="2">Conta Kelly somente</td></tr></tfoot>
        </table>
      </ScrollTable>

      <ScrollTable label="Vendas por título — Amazon Kelly">
        <table>
          <thead><tr><th>Título</th><th>eBook</th><th>Impresso</th><th>Unidades</th><th>Royalties</th></tr></thead>
          <tbody>{kellyTitles.map(row => <tr key={row.title}><td className="title-cell sticky-cell">{row.title}</td><td>{row.ebook}</td><td>{row.print}</td><td><strong>{row.units}</strong></td><td className="money">{usd.format(row.royalty)}</td></tr>)}</tbody>
        </table>
      </ScrollTable>

      <details className="sources"><summary>Ver arquivos usados neste bloco</summary><div><code>kelly screenshot amazon kelly.png</code><code>relatorio vendas amazon kelly.xlsx</code><code>Screenshot repasse amazon conta kelly.png</code><code>KDP_Payments_aa0a382c-8dbd-4aa0-9914-96c7ef9b8cf4.xlsx</code></div></details>
    </div>
  )
}

function GilbertoAmazon() {
  return (
    <div className="account-view" data-reveal>
      <AccountHeader eyebrow="Amazon KDP · conta independente" name="Gilberto De Souza" tone="bronze" note="Somente dados da Amazon KDP do Gilberto. Os valores abaixo não são somados aos royalties da Kelly." />

      <div className="metrics-grid metrics-three">
        <Metric label="Unidades registradas" value="5" detail="1 eBook + 4 impressos" />
        <Metric label="Payouts comprovados" value={usd.format(37.72)} detail="Maio + junho" />
        <Metric label="Conta de recebimento" value="•••185" detail="PROJETO G&K FOUNDATION" />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head"><div><span className="section-kicker">PAYOUTS</span><h3>Pagamentos comprovados</h3></div><Badge type="bronze">Amazon Gilberto</Badge></div>
          <Bars data={gilbertoPayouts} valueKey="amount" labelKey="period" />
        </section>
        <section className="panel payout-panel">
          <div className="panel-head"><div><span className="section-kicker">DESTINO DO REPASSE</span><h3>Conta cadastrada</h3></div><Badge type="bronze">Comprovado</Badge></div>
          <dl className="definition-list">
            <div><dt>Titular exibido</dt><dd>PROJETO G&amp;K FOUNDATION</dd></div>
            <div><dt>Tipo cadastral</dt><dd>Corporation</dd></div>
            <div><dt>Conta exibida</dt><dd>United States ••••••185</dd></div>
            <div><dt>Recebimento</dt><dd>Eletrônico / EFT</dd></div>
          </dl>
        </section>
      </div>

      <ScrollTable label="Livros e unidades — Amazon Gilberto">
        <table>
          <thead><tr><th>Título</th><th>Formato</th><th>Unidades</th></tr></thead>
          <tbody>{gilbertoTitles.map(row => <tr key={row.title}><td className="title-cell sticky-cell">{row.title}</td><td>{row.format}</td><td><strong>{row.units}</strong></td></tr>)}</tbody>
          <tfoot><tr><td className="sticky-cell">TOTAL</td><td>1 eBook + 4 impressos</td><td>5</td></tr></tfoot>
        </table>
      </ScrollTable>

      <ScrollTable label="Payouts — Amazon Gilberto">
        <table>
          <thead><tr><th>Período de vendas</th><th>Fonte</th><th>Valor</th><th>Data do pagamento</th><th>Método</th></tr></thead>
          <tbody>{gilbertoPayouts.map(row => <tr key={row.period}><td className="sticky-cell">{row.period}</td><td>{row.source}</td><td className="money">{usd.format(row.amount)}</td><td>{row.paid}</td><td><Badge type="success">{row.method}</Badge></td></tr>)}</tbody>
          <tfoot><tr><td className="sticky-cell">TOTAL PAGO</td><td></td><td className="money">{usd.format(37.72)}</td><td colSpan="2">Conta Gilberto somente</td></tr></tfoot>
        </table>
      </ScrollTable>

      <details className="sources"><summary>Ver arquivos usados neste bloco</summary><div><code>sales amazon gilberto.png</code><code>account amazon gilberto.png</code><code>KDP_Payments_6656f76e-4115-40a1-adc5-cab6e5e40cbb.xlsx</code></div></details>
    </div>
  )
}

function KellyBarnes() {
  return (
    <div className="account-view" data-reveal>
      <AccountHeader eyebrow="Barnes & Noble Press · conta Kelly" name="Kelly Marques" tone="sage" note="Este bloco pertence à conta B&N vinculada à Kelly. Os screenshots recebidos mostram pedidos de cópias feitos pela própria conta — não 97 vendas ao público." />

      <div className="notice notice-important"><strong>Ponto essencial:</strong> B&amp;N informa oficialmente que não paga royalties por pedidos feitos dentro da própria conta B&amp;N Press. Portanto, as 97 cópias abaixo são <strong>cópias encomendadas</strong>, e não devem ser apresentadas como 97 vendas ao consumidor.</div>

      <div className="metrics-grid">
        <Metric label="Pedidos documentados" value="4" detail="Maio, junho e agosto" />
        <Metric label="Cópias encomendadas" value="97" detail="Não são vendas de varejo" />
        <Metric label="Total desembolsado" value={usd.format(449.90)} detail="Livros + frete + handling + tax" />
        <Metric label="Conta payout" value="••••3193" detail="TD Bank · Checking" />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head"><div><span className="section-kicker">PEDIDOS</span><h3>Valor total por pedido</h3></div><Badge type="sage">Barnes Kelly</Badge></div>
          <Bars data={barnesOrders} valueKey="total" labelKey="date" />
        </section>
        <section className="panel payout-panel">
          <div className="panel-head"><div><span className="section-kicker">PAYOUT DE ROYALTIES</span><h3>Conta cadastrada</h3></div><Badge type="sage">EFT</Badge></div>
          <dl className="definition-list">
            <div><dt>Empresa</dt><dd>Projeto G&amp;K Foundation</dd></div>
            <div><dt>Banco</dt><dd>TD Bank</dd></div>
            <div><dt>Tipo</dt><dd>Checking</dd></div>
            <div><dt>Conta</dt><dd>••••3193</dd></div>
            <div><dt>Routing</dt><dd>••••0545</dd></div>
          </dl>
        </section>
      </div>

      <ScrollTable label="Pedidos de cópias — Barnes & Noble Kelly">
        <table>
          <thead><tr><th>Pedido</th><th>Data</th><th>Cópias</th><th>Subtotal</th><th>Handling</th><th>Frete</th><th>Tax</th><th>Total pago</th></tr></thead>
          <tbody>{barnesOrders.map(row => <tr key={row.order}><td className="sticky-cell"><strong>{row.order}</strong></td><td>{row.date}</td><td>{row.copies}</td><td className="money">{usd.format(row.subtotal)}</td><td>{usd.format(row.handling)}</td><td>{usd.format(row.shipping)}</td><td>{usd.format(row.tax)}</td><td className="money">{usd.format(row.total)}</td></tr>)}</tbody>
          <tfoot><tr><td className="sticky-cell">TOTAL</td><td></td><td>97</td><td className="money">{usd.format(349.45)}</td><td>{usd.format(10.10)}</td><td>{usd.format(68.50)}</td><td>{usd.format(21.85)}</td><td className="money">{usd.format(449.90)}</td></tr></tfoot>
        </table>
      </ScrollTable>

      <ScrollTable label="Itens dentro dos pedidos — Barnes & Noble Kelly">
        <table>
          <thead><tr><th>Pedido</th><th>Título</th><th>Autor do livro</th><th>Qtd.</th><th>Custo unitário</th><th>Total</th></tr></thead>
          <tbody>{barnesItems.map((row, i) => <tr key={`${row.order}-${i}`}><td className="sticky-cell">{row.order}</td><td className="title-cell">{row.title}</td><td>{row.author}</td><td>{row.qty}</td><td className="money">{usd.format(row.unit)}</td><td className="money">{usd.format(row.total)}</td></tr>)}</tbody>
        </table>
      </ScrollTable>
      <p className="context-note">Alguns títulos encomendados são de Gilberto De Souza, mas o <strong>bloco Barnes &amp; Noble continua pertencendo à conta/payout Kelly</strong>. O autor do título não muda o titular do painel B&amp;N mostrado nos documentos.</p>

      <details className="sources"><summary>Ver arquivos usados neste bloco</summary><div><code>1 barnes.png</code><code>2 barnes.png</code><code>3 barnes.png</code><code>4 barnes.png</code><code>5 barnes.png</code><code>6 barnes.png</code><code>7 barnes.png</code><code>account barnes.png</code></div></details>
    </div>
  )
}

function lastWednesdayNextMonth(date) {
  const y = date.getFullYear(); const m = date.getMonth()
  const last = new Date(y, m + 2, 0)
  const offset = (last.getDay() - 3 + 7) % 7
  last.setDate(last.getDate() - offset)
  return last
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date)
}

function PayoutEstimator() {
  const [saleDate, setSaleDate] = useState('2026-09-04')
  const estimates = useMemo(() => {
    const [y, m, d] = saleDate.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    if (Number.isNaN(date.getTime())) return null
    const amazon = new Date(y, (m - 1) + 3, 0)
    const barnes = lastWednesdayNextMonth(date)
    return { amazon, barnes }
  }, [saleDate])

  return (
    <section className="rules-card" data-reveal>
      <div className="rule-head"><div><span className="section-kicker">SIMULADOR DE PRAZO</span><h2>Se a venda acontecer em uma data específica, quando o payout chega?</h2></div><div className="date-field"><label htmlFor="sale-date">Data da venda</label><input id="sale-date" type="date" value={saleDate} onChange={e => setSaleDate(e.target.value)} /></div></div>
      {estimates && <div className="payout-columns">
        <PayoutRoute><Badge type="blue">Amazon KDP</Badge><strong>{formatDate(estimates.amazon)}</strong><p>Aproximadamente no fim do segundo mês após o mês da venda. Depois, EFT pode levar 1–5 dias úteis para aparecer no banco.</p></PayoutRoute>
        <PayoutRoute><Badge type="sage">Barnes & Noble</Badge><strong>{formatDate(estimates.barnes)}</strong><p>Última quarta-feira do mês seguinte, desde que o limite mínimo de US$ 25 em royalties seja atingido. EFT pode levar até 2 dias úteis.</p></PayoutRoute>
      </div>}
      <div className="timeline-mini"><span>Venda</span><i></i><span>Fecha o mês</span><i></i><span>Processamento</span><i></i><span>Payout</span></div>
    </section>
  )
}

function RoyaltyCalculator() {
  const [price, setPrice] = useState(25)
  const [amazonCost, setAmazonCost] = useState(2.30)
  const [barnesCost, setBarnesCost] = useState(3.21)
  const amazonRate = price >= 9.99 ? 0.60 : 0.50
  const amazon = Math.max(0, price * amazonRate - amazonCost)
  const barnes = Math.max(0, price * 0.55 - barnesCost)

  return (
    <section className="rules-card" data-reveal>
      <div className="rule-head"><div><span className="section-kicker">SIMULADOR DE ROYALTY</span><h2>Livro impresso vendido por {usd.format(Number(price) || 0)}</h2></div><Badge>Não mistura contas</Badge></div>
      <div className="calculator-inputs">
        <label>Preço de capa (US$)<input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} /></label>
        <label>Custo de impressão Amazon (US$)<input type="number" min="0" step="0.01" value={amazonCost} onChange={e => setAmazonCost(Number(e.target.value))} /></label>
        <label>Custo de impressão B&amp;N (US$)<input type="number" min="0" step="0.01" value={barnesCost} onChange={e => setBarnesCost(Number(e.target.value))} /></label>
      </div>
      <div className="calc-results">
        <article><span className="platform-dot dot-blue"></span><div><span>Amazon KDP</span><strong>{usd.format(amazon)}</strong><small>{Math.round(amazonRate * 100)}% × preço − custo de impressão</small></div></article>
        <article><span className="platform-dot dot-sage"></span><div><span>Barnes &amp; Noble</span><strong>{usd.format(barnes)}</strong><small>55% × preço − custo de impressão</small></div></article>
      </div>
      <div className="notice notice-neutral"><strong>Como interpretar o exemplo de US$ 25:</strong> na Amazon, com custo de impressão de US$ 2,30 — custo efetivamente documentado em parte das vendas da Kelly — o royalty fica em <strong>US$ 12,70</strong>. Na B&amp;N, o screenshot mostra preços de cópias encomendadas, não o custo técnico de impressão usado no cálculo de royalty; por isso o campo B&amp;N acima é uma simulação editável, e não um valor bancário comprovado.</div>
    </section>
  )
}

export default function ReportPage() {
  const [active, setActive] = useState('kelly-amazon')
  useReveal()
  const current = accounts.find(a => a.id === active)

  return (
    <main>
      <header className="hero">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="container hero-inner" data-reveal>
          <div className="hero-top"><Badge type="dark">RELATÓRIO CONSOLIDADO · 04/09/2026</Badge><button className="print-button" onClick={() => window.print()}>Imprimir / PDF</button></div>
          <h1>Vendas, royalties e payouts<br/><span>sem misturar as contas.</span></h1>
          <p>Uma leitura simples e auditável das informações enviadas: Amazon KDP de Kelly, Amazon KDP de Gilberto e Barnes &amp; Noble Press da Kelly — cada uma em seu próprio bloco.</p>
          <div className="hero-summary"><div><strong>3</strong><span>contas/blocos separados</span></div><div><strong>100%</strong><span>valores em USD</span></div><div><strong>Dados</strong><span>de screenshots + planilhas</span></div></div>
        </div>
      </header>

      <div className="sticky-nav"><div className="container"><a href="#contas">Contas</a><a href="#prazos">Prazo do payout</a><a href="#royalties">Simular royalty</a><a href="#fontes">Regras oficiais</a></div></div>

      <div className="container report-body">
        <section className="intro" data-reveal>
          <span className="section-kicker">LEITURA SEGURA</span><h2>Primeiro escolha a conta que deseja analisar</h2><p>Para impedir confusão, o painel mostra <strong>uma conta por vez</strong>. Trocar a aba não soma valores entre pessoas ou plataformas.</p>
        </section>

        <section id="contas" className="account-switcher" aria-label="Selecionar conta" data-reveal>
          {accounts.map(account => <button key={account.id} onClick={() => setActive(account.id)} aria-selected={active === account.id} className={`account-tab ${active === account.id ? 'active' : ''} tone-${account.tone}`}><span>{account.eyebrow}</span><strong>{account.name}</strong></button>)}
        </section>

        <div className={`active-label tone-${current.tone}`}><span>Você está vendo agora</span><strong>{current.short}</strong></div>

        <section className="account-stage" key={active}>
          {active === 'kelly-amazon' && <KellyAmazon />}
          {active === 'gilberto-amazon' && <GilbertoAmazon />}
          {active === 'kelly-barnes' && <KellyBarnes />}
        </section>

        <section id="prazos" className="spaced"><PayoutEstimator /></section>
        <section id="royalties" className="spaced"><RoyaltyCalculator /></section>

        <section id="fontes" className="official" data-reveal>
          <div><span className="section-kicker">REGRAS OFICIAIS</span><h2>O que as plataformas dizem</h2><p>Essas regras explicam os prazos e fórmulas usados no relatório; não alteram os números extraídos dos arquivos enviados.</p></div>
          <div className="official-grid">
            <a href="https://kdp.amazon.com/pt_BR/help/topic/GK2MKZUL6U3SFBPZ" target="_blank" rel="noreferrer"><span>Amazon KDP</span><strong>Quando serei pago?</strong><small>≈ 60 dias após o fim do mês; EFT 1–5 dias úteis.</small></a>
            <a href="https://kdp.amazon.com/en_US/help/topic/G201834330" target="_blank" rel="noreferrer"><span>Amazon KDP</span><strong>Royalty de paperback</strong><small>50% ou 60% do preço, menos impressão.</small></a>
            <a href="https://help-press.barnesandnoble.com/hc/en-us/articles/5359658688923-Getting-Paid-for-Sales" target="_blank" rel="noreferrer"><span>B&amp;N Press</span><strong>Getting Paid for Sales</strong><small>US$ 25 mínimo; pagamento no mês seguinte.</small></a>
            <a href="https://help-press.barnesandnoble.com/hc/en-us/articles/47055529407131-Royalties-from-Print-Book-Sales" target="_blank" rel="noreferrer"><span>B&amp;N Press</span><strong>Print royalties</strong><small>55% do preço, menos impressão.</small></a>
          </div>
        </section>

        <footer><div><strong>Relatório de conferência</strong><span>Data de corte: 04/09/2026</span></div><p>Dados bancários sensíveis foram mascarados. Quando um dado não aparece no screenshot enviado, ele é indicado como não comprovado em vez de ser inferido.</p></footer>
      </div>
    </main>
  )
}
