import React, { useState } from "react";
import { Carousel, Card, Row, Col, Form, Input, Button, Space, Typography } from "antd";
import { MapPin, Mail, Phone, Github, Facebook, Linkedin } from "lucide-react";

const { Title, Paragraph } = Typography;

interface Skill {
  name: string;
  link: string;
}

interface Product {
  Img: string;
  Name: string;
  Infor: string;
  Des: string;
  Position: string;
  Contributions: string[];
}

interface Social {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const skills: Skill[] = [
  { name: "HTML5", link: "https://files.softicons.com/download/web-icons/html5-icons-by-iconshock/png/256/logo.png" },
  { name: "CSS3", link: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
  { name: "JavaScript", link: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
  { name: "ReactJS", link: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "VueJS", link: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
];

const listProduct: Product[] = [
  {
    Img: "https://dummyimage.com/600x400/1e1e1e/ffffff.png&text=Ytool+App",
    Name: "Ytool App",
    Infor: "React Native, RestAPI, Redux",
    Des: "App used to get tags of videos on YouTube.",
    Position: "Front-end Dev",
    Contributions: ["Developed UI", "Fixed bugs", "Updated app"],
  },
  {
    Img: "https://dummyimage.com/600x400/1e1e1e/ffffff.png&text=Hotel+Liforte",
    Name: "Hotel Liforte",
    Infor: "VueJS, RestAPI, Socket",
    Des: "Hotel management system.",
    Position: "Front-end Dev",
    Contributions: ["Responsive UI", "Integrated APIs", "SEO optimization"],
  },
];

const social: Social[] = [
  { name: "Facebook", icon: <Facebook />, url: "https://facebook.com/phong.nguyentrung.798" },
  { name: "Github", icon: <Github />, url: "https://github.com/phong99tb" },
  { name: "LinkedIn", icon: <Linkedin />, url: "https://www.linkedin.com/in/pope-nguyen-85444b202/" },
];

const Home: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "80px 16px", background: "#001529", color: "#fff" }}>
        <Title style={{ color: "#fff" }}>I am Nguyen Trung Phong</Title>
        <Paragraph style={{ fontSize: 20, color: "#ccc" }}>
          I am a <span style={{ color: "#40a9ff", fontWeight: "bold" }}>Developer</span>
        </Paragraph>
      </section>

      {/* About */}
      <section style={{ padding: "80px 16px", background: "#f0f2f5" }}>
        <Row gutter={32} align="middle" justify="center">
          <Col xs={24} md={10}>
            <img
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/379465955_2174518406077645_5761545707854918183_n.jpg"
              alt="personal"
              style={{ width: "100%", borderRadius: 12 }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Title level={2}>Hello, my name is Nguyen Trung Phong</Title>
            <Paragraph>
              As a software developer, I create applications that provide the best user experience using modern
              technologies.
            </Paragraph>
          </Col>
        </Row>
      </section>

      {/* Skills */}
      <section style={{ padding: "80px 16px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Skills
        </Title>
        <Carousel autoplay dots>
          {skills.map((s) => (
            <div key={s.name} style={{ textAlign: "center" }}>
              <img src={s.link} alt={s.name} style={{ width: 120, height: 120, objectFit: "contain", margin: "0 auto" }} />
              <Paragraph>{s.name}</Paragraph>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Products */}
      <section style={{ padding: "80px 16px", background: "#fafafa" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Products
        </Title>
        <Row gutter={[24, 24]}>
          {listProduct.map((p) => (
            <Col xs={24} md={12} key={p.Name}>
              <Card hoverable cover={<img src={p.Img} alt={p.Name} style={{ height: 200, objectFit: "cover" }} />}>
                <Card.Meta title={p.Name} description={p.Infor} />
                <Paragraph style={{ marginTop: 12 }}>{p.Des}</Paragraph>
                <Paragraph strong>Position: {p.Position}</Paragraph>
                <ul>
                  {p.Contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Contact */}
      <section style={{ padding: "80px 16px" }}>
        <Row gutter={32}>
          <Col xs={24} md={12}>
            <Title level={3}>Say Hi 👋🏻</Title>
            <Paragraph>Let's Work Together. Teamwork makes common people achieve uncommon results.</Paragraph>
            <Space direction="vertical" size="middle">
              <Space>
                <MapPin /> <span>Yen Xa, Thanh Tri, Ha Noi City, Vietnam.</span>
              </Space>
              <Space>
                <Mail /> <span>phong99tb@gmail.com</span>
              </Space>
              <Space>
                <Phone /> <span>0967810899</span>
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Title level={3}>Get In Touch</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="Name" rules={[{ required: true, message: "Please input your name" }]}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item name="Email" rules={[{ type: "email", required: true, message: "Enter a valid email" }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="Mess" rules={[{ required: true, message: "Please enter your message" }]}>
                <Input.TextArea placeholder="Message" rows={4} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Social */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Title level={3}>Let's Connect 🤝🏻</Title>
          <Space size="large" wrap>
            {social.map((s) => (
              <Button
                key={s.name}
                type="default"
                icon={s.icon}
                onClick={() => window.open(s.url, "_blank")}
              >
                {s.name}
              </Button>
            ))}
          </Space>
        </div>
      </section>
    </div>
  );
};

export default Home;
