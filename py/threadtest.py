# coding=utf-8
import time 
import threading
def sleep_3():
    time.sleep(4)
def sleep_5():
    time.sleep(2)
def sleef_1():
    time.sleep(3)
def main():
    startTime=time.time()
    print('start sleep3')
    thread1=threading.Thread(target=sleep_3)
    thread1.start()
    print('start sleep5')
    thread2=threading.Thread(target=sleep_5)
    thread2.start()
    thread3=threading.Thread(target=sleef_1)
    thread3.start()
    print('start sleep1')
    thread1.join()
    thread2.join()
    thread3.join()
    endTime=time.time()
    print(str(endTime-startTime)+' s')
if __name__=='__main__':
   main()