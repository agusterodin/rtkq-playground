import clsx from 'clsx'
import { Field, Switch as HeadlessSwitch } from '@headlessui/react'
import { CampaignMetadata } from '@/datamodels'
import { useSetCampaignActiveMutation } from '@/state/campaign'

export default function ActiveToggle({ id, active }: CampaignMetadata) {
  const [setCampaignActive] = useSetCampaignActiveMutation()

  return (
    <Switch
      enabled={active}
      setEnabled={() => {
        setCampaignActive({ id, active: !active })
      }}
    />
  )
}

// Switch

interface SwitchProps {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

export function Switch({ enabled, setEnabled }: SwitchProps) {
  return (
    <Field as="div" className="mr-3.5 flex items-center">
      <HeadlessSwitch
        className={clsx(
          enabled ? 'bg-green-600' : 'bg-gray-500',
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
        )}
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      >
        <span
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block size-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </HeadlessSwitch>
    </Field>
  )
}
