import React from "react"
import Layout from "../components/layout_with_sidebar.js"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import Sidebar from "../components/sidebar"
import { Card, Button, InputGroup, FormControl } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import "../styles/article.css"

const Article = ({ data, location }) => {
  if (!location.state) {
    return <Layout></Layout>
  } else {
    const article = location.state.element
    let mdx = data.mdxData.edges[0]
    mdx = mdx.node.frontmatter.data
    let similar = []
    let j = 0
    for (let i = 0; i < mdx.length; i++) {
      if (
        mdx[i].category === article.category &&
        j < 4 &&
        article.id !== mdx[i].id
      ) {
        similar[j] = mdx[i]
        j++
      }
    }
    mdx = mdx.filter(element => (element.id === article.id ? element : null))
    return (
      <Layout title="Article | Web-shop">
        <Sidebar />
        <div id="content">
          {mdx.map(element => {
            return (
              <div key={element.id}>
                <Card style={{ margin: "0 10px 10px", padding: "10px" }}>
                  <Card.Title>{element.title}</Card.Title>
                  <div id="cardContent" style={{ display: "grid" }}>
                    <Img
                      fluid={element.image.childImageSharp.fluid}
                      className="customImage"
                      style={{
                        height: "300px",
                        maxWidth: "480px",
                        borderRadius: "5px",
                      }}
                    />
                    <div
                      id="purchase"
                      style={{ alignSelf: "center", justifySelf: "center" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          id="quantity"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            style={{ margin: "5px" }}
                          />
                          <div style={{ height: "38px" }}>
                            <InputGroup
                              className="mb-3"
                              style={{ width: "45px" }}
                            >
                              <FormControl placeholder="1" />
                            </InputGroup>
                          </div>
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ margin: "5px" }}
                          />
                        </div>
                        <div style={{ padding: "5px" }}>{element.price}€</div>
                      </div>
                      <Button
                        variant="primary"
                        style={{ width: "100%" }}
                        onClick={() => {
                          window.confirm("Are you sure?")
                        }}
                      >
                        Buy now
                      </Button>
                    </div>
                  </div>
                </Card>
                <Card style={{ margin: "0 10px 10px", padding: "10px" }}>
                  <Card.Title>Description</Card.Title>
                  {element.description}
                </Card>
              </div>
            )
          })}
          <Card
            style={{
              display: "grid",
              margin: "10px",
            }}
          >
            <Card.Title style={{ margin: "10px" }}>Similar</Card.Title>
            <div
              id="similarGrid"
              style={{
                display: "grid",
                //gridTemplateColumns: "0.25fr 0.25fr 0.25fr 0.25fr",
                margin: "0px 5px 10px",
                padding: "0px",
              }}
            >
              {similar.map((element, index) => {
                return (
                  <Card
                    style={{
                      margin: "0px 5px",
                      overflow: "hidden",
                    }}
                    key={element.id}
                    id={"similar" + index}
                  >
                    <Img
                      fluid={element.image.childImageSharp.fluid}
                      className="customImage"
                      style={{
                        height: "220px",
                      }}
                    />
                    <Card.Body
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.price}€</Card.Text>
                      <Button
                        variant="secondary"
                        style={{ width: "100%" }}
                        onClick={() => {
                          navigate("/article", {
                            state: { element },
                          })
                        }}
                      >
                        Purchase
                      </Button>
                    </Card.Body>
                  </Card>
                )
              })}
            </div>
          </Card>
        </div>
      </Layout>
    )
  }
}
export default Article

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
