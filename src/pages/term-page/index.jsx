import React from "react";
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import termData from "../../data/termData.json";

const AccordionItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <button
        className="accordion-control"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${index}`}
      >
        <div className="accordion-summary">
          <div className="term-subtitle">{item.title}</div>
          <div
            className={`accordion-summary-caret ${isOpen ? "rotate-180" : ""}`}
          >
            <DownOutlined style={{ margin: 0, padding: 0 }} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          className="accordion-panel"
          id={`accordion-panel-${index}`}
          role="region"
          aria-labelledby={`accordion-control-${index}`}
        >
          <p className="term-date">{item.effectiveDate}</p>

          {item.highlights.length > 0 && (
            <ul className="policy-highlights">
              <>
                <h3 className="term-highlights-title">Highlights</h3>
                {item.highlights.map((highlight, idx) => (
                  <li className="term-highlight-item" key={idx}>
                    {highlight.text}
                  </li>
                ))}
              </>
            </ul>
          )}

          <div className="term-content">
            {item.content.map((content, idx) => (
              <p className="term-content-item" key={idx}>
                {content}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TermPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex == index ? null : index);
  };

  return (
    <div className="term-container">
      <h1 className="term-title">Terms of Service Agreement</h1>
      {termData?.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex == index}
          onToggle={toggleAccordion}
        />
      ))}
      <div className="term-footer">
        Thank you for choosing AuctionKoi.com. Your privacy is important to us,
        and we are committed to providing a secure and positive experience.
      </div>
    </div>
  );
};

export default TermPage;
