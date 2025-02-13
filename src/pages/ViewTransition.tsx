import { MouseEvent, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { ModalQR, Tab } from "../components"

// generate some items
const ITEMS = Array.from({ length: 5 }, () => ({ id: crypto.randomUUID(), justAdded: false }))

export default function ViewTransition() {
  const [activeTab, setActiveTab] = useState(0)

  const changeActiveTab = (idx: number) => {
    if (!document.startViewTransition) {
      setActiveTab(idx)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => setActiveTab(idx))
    })
  }

  // -------------------------------------------------------------------------

  const [items, setItems] = useState(ITEMS)
  const justAddedRef = useRef<HTMLLIElement>(null)

  const removeItem = (ev: MouseEvent, idToRemove: string) => {
    if (!document.startViewTransition) {
      setItems((prevItems) => prevItems.filter(({ id }) => id !== idToRemove))
      return
    }

    // animate the removal of the item by setting the viewTransitionName to "item-active"
    const parentElement = (ev.currentTarget as HTMLElement).parentElement
    if (parentElement) {
      parentElement.style.viewTransitionName = "item-active"
    }

    document.startViewTransition(() => {
      flushSync(() => setItems((prevItems) => prevItems.filter(({ id }) => id !== idToRemove)))
    })
  }

  const addItem = async () => {
    const newId = crypto.randomUUID()

    if (!document.startViewTransition) {
      setItems((prevItems) => [...prevItems, { id: newId, justAdded: true }])
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setItems((prevItems) => [{ id: newId, justAdded: true }, ...prevItems]))
    })

    // wait for the transition to be finished
    await transition.finished

    if (!justAddedRef.current) return

    // reset the viewTransitionName to the default
    justAddedRef.current.style.viewTransitionName = `item-${newId}`
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <h1>View Transition API</h1>
        <ModalQR
          imageUrl="/assets/images/view-transition-qrcode.png"
          url="https://fe-mambo-jambo-web-apis.vercel.app/view-transition"
        />
      </div>
      <section className="min-h-svh">
        <h2 className="text-2xl mb-4">Tabs active indicator</h2>
        <div role="tablist" className="tabs tabs-bordered tabs-xl">
          <Tab id="tab-0" isActive={activeTab === 0} onClick={() => changeActiveTab(0)}>
            Tab 1
          </Tab>
          <Tab id="tab-1" isActive={activeTab === 1} onClick={() => changeActiveTab(1)}>
            Tab 2
          </Tab>
          <Tab id="tab-2" isActive={activeTab === 2} onClick={() => changeActiveTab(2)}>
            Tab 3
          </Tab>
        </div>
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="tab-content block p-4 pl-0"
        >
          <span className="font-bold text-xl">Tab content {activeTab + 1}</span> Liquorice sweet
          cheesecake pudding jujubes toffee cake apple pie. Tiramisu powder cake bonbon candy canes
          topping wafer dessert muffin. Macaroon halvah pudding jelly beans lemon drops danish I
          love.
        </div>
      </section>
      <section className="min-h-svh">
        <div className="flex mb-4 items-center justify-between">
          <h2 className="text-2xl">List</h2>
          <button type="button" className="btn btn-secondary" onClick={addItem}>
            Add item
          </button>
        </div>
        <ul className="list rounded-box">
          {items.map((item) => (
            <li
              className="list-row items-center dark:hover:bg-gray-700 hover:bg-gray-300 transition"
              key={item.id}
              style={{ viewTransitionName: item.justAdded ? "item-active" : `item-${item.id}` }}
              data-id={item.id}
              ref={item.justAdded ? justAddedRef : undefined}
            >
              <div className="text-xl">Item {item.id}</div>
              <div />
              <button
                type="button"
                className="btn btn-circle btn-ghost"
                onClick={(ev) => removeItem(ev, item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="size-[1.2em]"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
