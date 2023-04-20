import { useEffect, useRef } from "react"
import "./Navigation.css"
import { NavigationItem } from "./NavigationItem.jsx"
import * as bootstrap from "bootstrap"

export function Navigation({ addBox }: { addBox: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(function initialize() {
    const tooltipTriggerList = Array.from(ref.current!.querySelectorAll(
      "[data-bs-toggle=\"tooltip\"]"))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }, [ref])

  return (
    <div
      ref={ ref }
      className="navigation d-flex flex-column flex-shrink-0 bg-body-tertiary"
      style={ { width: "4.5rem" } }
    >
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link py-3 border-bottom rounded-0"
            aria-current="page"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Square"
            data-bs-original-title="Square"
            onClick={ () => {
              addBox()
            } }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={ 16 }
              height={ 16 }
              fill="currentColor"
              className="bi bi-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </a>
        </li>
        { /*<li>
          <a
            href="#"
            className="nav-link py-3 border-bottom rounded-0"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            aria-label="Triangle"
            data-bs-original-title="Triangle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-triangle"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            </svg>
          </a>
        </li> */}
      </ul>
    </div>
  )
}
