import React from "react";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MailOutline from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";

export default class Contact extends React.Component {
  render() {
    return (
      <section style={{ padding: "5rem 2rem", marginTop: "1rem" }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              style={{ marginBottom: "0" }}
              align="center"
              variant="h4"
            >
              How to Reach us
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              paragraph
              style={{ fontSize: "1.1rem", padding: "0" }}
            >
              Want to get in touch? You can use any of the below channels.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Card data-aos="zoom-in" data-aos-delay="300">
              <CardContent align="center">
                <WhatsAppIcon
                  style={{ fontSize: "40px", color: "green" }}
                  align="center"
                />
                <Typography gutterBottom variant="h6" align="center">
                  Whatsapp
                </Typography>
                <Typography paragraph align="center" variant="body1">
                  <a
                    style={{
                      color: "green",
                      fontSize: "1.1rem",
                    }}
                    href="https://api.whatsapp.com/send?phone=2349030009108&text=Hello Shuttlelane"
                  >
                    +234 903 000 9108
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Card data-aos="zoom-in" data-aos-delay="400">
              <CardContent align="center">
                <PhoneIcon
                  style={{
                    fontSize: "40px",
                    color: "#000080",
                  }}
                  color="primary"
                  align="center"
                />
                <Typography gutterBottom variant="h6" align="center">
                  Call us on
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  style={{
                    color: "#000080",
                    fontSize: ".9rem",
                  }}
                >
                  <a href="tel:+2349030009452">+234 903 000 9452</a>
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  style={{
                    color: "#000080",
                    fontSize: ".9rem",
                  }}
                >
                  <a href="tel:+2349030009486">+234 903 000 9486</a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={2}>
            <Card data-aos="zoom-in" data-aos-delay="300">
              <CardContent align="center">
                <MailOutline
                  style={{
                    fontSize: "40px",
                    color: "#ec1633",
                  }}
                  color="primary"
                  align="center"
                />
                <Typography gutterBottom variant="h6" align="center">
                  Send us an Email
                </Typography>
                <Typography paragraph align="center" variant="body1">
                  <a
                    style={{
                      color: "#ec1633",
                      fontSize: "1.1rem",
                    }}
                    href="mailto:info@shuttlelane.com"
                  >
                    info@shuttlelane.com
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }
}
