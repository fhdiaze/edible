use askama::Template;
use axum::{response::Html, routing::get, Router};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let router = Router::new().route("/", get(handle_get));

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    axum::serve(listener, router).await.unwrap();
}

#[derive(Template)]
#[template(path = "home.html")]
struct HomeTemplate;

async fn handle_get() -> Html<String> {
    let template = HomeTemplate {};
    let content = template.render().expect("msg");

    Html(content)
}
