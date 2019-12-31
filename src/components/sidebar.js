import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { ListGroup } from "react-bootstrap"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          categories {
            id
            name
          }
        }
      }
    }
  `)
  const categories = data.site.siteMetadata.categories

  return (
    <div
      id="sidebar"
      style={{
        backgroundColor: "white",
        padding: "0px 10px 10px",
        
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.125)"
      }}
    >
      <h3 style={{ textAlign: "center" }}>Categories</h3>
      <ListGroup>
        {categories.map(category => {
          return (
            <ListGroup.Item
              className="categoryItem"
              action
              variant="secondary"
              key={category.id}
              style={{ margin: "5px 0px 5px 0px", borderRadius: "5px", display: "flex", justifyContent: "center" }}
            >
              {category.name}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default Sidebar
