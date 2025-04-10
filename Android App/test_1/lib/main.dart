import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: InAppWebViewPage(),
    );
  }
}

class InAppWebViewPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("InAppWebView"),
      ),
      body: InAppWebView(
        initialUrlRequest: URLRequest(url: Uri.parse("https://uaps.netlify.app/")),
      ),
    );
  }
}

