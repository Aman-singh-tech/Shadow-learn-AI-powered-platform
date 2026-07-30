#include<iostream>
using namespace std;
/*void print(int n){
   if(n==0){
        return;
    }
    cout<<n<<" ";
    cout<<endl;
    print(n-1);
}



int main(){
    int n=5;
    print(5);
    return 0;
} */
void print(int n){
    if(n==2){
        cout<<n<<" ";
        return;
    }
    cout<<n<<" ";
    cout<<endl;
    print(n-2);
}
int main(){
    int n=8;
    
    print(n);
    return 0;
}