import React, { useEffect } from "react";
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import policyData from "../../data/policyData.json";

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
          <div className="policy-subtitle">{item.title}</div>
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
          <p className="policy-date">{item.effectiveDate}</p>

          {item.highlights.length > 0 && (
            <ul className="policy-highlights">
              <>
                <h3 className="policy-highlights-title">Highlights</h3>
                {item.highlights.map((highlight, idx) => (
                  <li className="policy-highlight-item" key={idx}>
                    {highlight.text}
                  </li>
                ))}
              </>
            </ul>
          )}

          <div className="policy-content">
            {item.content.map((content, idx) => (
              <p className="policy-content-item" key={idx}>
                {content}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PolicyPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex == index ? null : index);
  };
  // //console.log(policyData);
  return (
    <div className="policy-container">
      <h1 className="policy-title">Privacy Policy</h1>
      {policyData?.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex == index}
          onToggle={toggleAccordion}
        />
      ))}
      <div className="policy-footer">
        Thank you for choosing AuctionKoi.com. Your privacy is important to us,
        and we are committed to providing a secure and positive experience.
      </div>
    </div>
  );
};

export default PolicyPage;
