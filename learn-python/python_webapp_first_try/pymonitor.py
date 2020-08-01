#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/8/1 22:10.
# @File: pymonitor.py

__author__ = 'yangqixin'

import os, sys, time, subprocess

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

command = ['echo', 'ok']
process = None


def log(s):
    print('[Monitor] ', s)


class MyFileSystemEventHandler(FileSystemEventHandler):

    def __init__(self, fn):
        super(MyFileSystemEventHandler, self).__init__()
        self.restart = fn

    def on_any_event(self, event):
        if event.src_path.endswith('.py'):
            log('Python source file changed: {path}'.format(path=event.src_path))
            self.restart()


def kill_process():
    global process
    if process:
        log('Kill process [{}]'.format(process.pid))
        process.kill()
        process.wait()
        log('Process ended with code: {}'.format(process.returncode))
        process = None


def start_process():
    global process, command
    log('Start process {}'.format(' '.join(command)))

    process = subprocess.Popen(command, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr)


def restart_process():
    kill_process()
    start_process()


def start_watch(path, callback):
    observer = Observer()
    observer.schedule(MyFileSystemEventHandler(restart_process), path, recursive=True)
    observer.start()

    log('Watching directory: {dir}'.format(dir=path))

    start_process()

    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()


if __name__ == '__main__':
    argv = sys.argv[1:]
    if not argv:
        exit(0)

    if argv[0] != 'python3':
        argv.insert(0, 'python3')

    command = argv
    path = os.path.abspath('.')
    start_watch(path, None)
