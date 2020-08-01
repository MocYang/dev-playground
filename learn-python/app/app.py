# /user/bin/env python
# -*- charset: utf-8 -*-

# @Author: yangqixin.
# @Time: 2020/7/27 22:36.
# @File: app.py
# @Software: PyCharm.


from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    # return """
    #     <h1>Home</h1>
    #     <div><a href="//localhost:5000/signin">sign in</a></div>
    # """
    return render_template('index.html')


@app.route('/signin', methods=['GET'])
def signin_form():
    # return """
    #     <form action="/signin" method="POST">
    #         <p><input name="username" /></p>
    #         <p><input name="password" /></p>
    #         <p><button type="submit">Sign in</button></p>
    #     </form>
    # """
    return render_template('form.html')


@app.route('/signin', methods=['POST'])
def signin():
    username = request.form['username']
    password = request.form['password']
    if username == 'admin' and password == 'password':
        # return '<h3>hello admin!</h3>'
        return render_template('welcome.html', username=username)
    return '<h3>Bad username or password.</h3>'


if __name__ == '__main__':
    app.run()



