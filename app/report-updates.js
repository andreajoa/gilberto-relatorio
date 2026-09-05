'use client'

import { useEffect } from 'react'

function setText(node, value) {
  if (node && node.textContent !== value) node.textContent = value
}

function addDefinitionRow(list, label, value) {
  if (!list) return
  const rows = Array.from(list.children)
  const existing = rows.find(row => row.querySelector('dt')?.textContent?.trim() === label)

  if (existing) {
    setText(existing.querySelector('dd'), value)
    return
  }

  const row = document.createElement('div')
  const dt = document.createElement('dt')
  const dd = document.createElement('dd')
  dt.textContent = label
  dd.textContent = value
  row.append(dt, dd)
  list.appendChild(row)
}

function updateKellyAmazonPayout() {
  const views = Array.from(document.querySelectorAll('.account-view'))
  const kellyView = views.find(view => {
    const text = view.textContent || ''
    return text.includes('Amazon KDP · conta independente') &&
      text.includes('Kelly Marques') &&
      text.includes('Amazon Kelly')
  })

  if (!kellyView) return

  const payoutPanel = kellyView.querySelector('.payout-panel')
  const list = payoutPanel?.querySelector('.definition-list')

  addDefinitionRow(list, 'Forma de pagamento', 'EFT')
  addDefinitionRow(list, 'Pagamentos comprovados', '29/07 e 29/08/2026')
  addDefinitionRow(list, 'Conta bancária de destino', 'United States ••••••193')
  addDefinitionRow(list, 'Titular exibido', 'PROJETO G&K FOUNDATION CORP')
  addDefinitionRow(list, 'Tipo cadastral', 'Pessoa jurídica')
  addDefinitionRow(list, 'Data de incorporação', '21/03/2026')
  addDefinitionRow(list, 'Endereço cadastrado', '15 Birch St Apt 1107, Milford, MA 01757, Estados Unidos')

  const badge = payoutPanel?.querySelector('.badge')
  setText(badge, 'EFT · •••193')

  const notice = payoutPanel?.querySelector('.notice')
  setText(
    notice,
    'Cadastro bancário confirmado pelo novo screenshot: a Amazon KDP da Kelly recebe por EFT na conta dos Estados Unidos final 193, em nome de PROJETO G&K FOUNDATION CORP. Esta conta é diferente da Amazon do Gilberto (final 185) e da Barnes & Noble da Kelly (TD Bank final 3193).'
  )

  const sourceBox = kellyView.querySelector('.sources div')
  if (sourceBox) {
    const sourceName = 'Screen Shot 2026-09-04 at 20.53.26.png'
    const alreadyListed = Array.from(sourceBox.querySelectorAll('code')).some(code => code.textContent === sourceName)
    if (!alreadyListed) {
      const code = document.createElement('code')
      code.textContent = sourceName
      sourceBox.appendChild(code)
    }
  }
}

export default function ReportUpdates() {
  useEffect(() => {
    let scheduled = false

    const apply = () => {
      scheduled = false
      updateKellyAmazonPayout()
    }

    const scheduleApply = () => {
      if (scheduled) return
      scheduled = true
      window.requestAnimationFrame(apply)
    }

    scheduleApply()

    const observer = new MutationObserver(scheduleApply)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })

    return () => observer.disconnect()
  }, [])

  return null
}
