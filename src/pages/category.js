import React from "react"
import Layout from "../components/layout_with_sidebar.js"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import Sidebar from "../components/sidebar"
import { Card, Button } from "react-bootstrap"

export const Category = ({ data, location }) => {
  if (!location.state) {
    return <Layout></Layout>
  } else {
    const categoryModel = location.state.categoryModel
    let mdx = data.mdxData.edges[0]
    mdx = mdx.node.frontmatter.data
    mdx = mdx.filter(element => {
      if (element.category === categoryModel.folderName) {
        return element
      }
    })
    return (
      <Layout>
        <Sidebar />
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0px 10px 10px 10px",
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.125",
            borderRadius: "5px",
          }}
        >
          <Card
            className="searchbox"
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Title>Search</Card.Title>
          </Card>
          <div
            className="cardGrid"
            style={{
              margin: "10px",
              display: "grid",
              gridGap: "10px",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(274px, max-content))",
              justifyContent: "center",
            }}
          >
            {mdx.map(element => {
              return (
                <Card
                  style={{ overflow: "hidden" }}
                  key={element.id}
                  data-id={element.id}
                >
                  <Img
                    fluid={element.image.childImageSharp.fluid}
                    className="customImage"
                    style={{
                      height: "220px",
                    }}
                  />
                  <Card.Body style={{ padding: "10px" }}>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.price}€</Card.Text>
                    <Button
                      variant="secondary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        navigate("/article")
                      }}
                    >
                      Purchase
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default Category

export const query = graphql`
  {
    mdxData: allMdx {
      edges {
        node {
          frontmatter {
            data {
              category
              description
              id
              price
              title
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
