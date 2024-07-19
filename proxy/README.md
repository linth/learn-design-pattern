# Proxy

Proxy is a structural design pattern that provides an object that acts as a substitute for a real service object used by a client. A proxy receives client requests, does some work (access control, caching, etc.) and then passes the request to a service object.

- 是一種結構型設計模式，它的主要作用是為其他對象提供一種代理，以控制對這些對象的訪問。
- 代理模式涉及到一個代理對象來控制對原對象的訪問，可以在不改變原對象的情況下，通過代理來添加額外的功能或進行控制。

## 主要作用
1. 控制對象訪問: 代理模式可以控制對某些對象的訪問。這在需要限制或監控對象訪問的情況下非常有用。
2. 延遲實例化：代理模式可以延遲對象的實例化，直到真正需要的時候才創建對象，這有助於提升性能和節省資源。
3. 功能擴展：通過代理模式，可以在不改變原對象的情況下，增加額外的功能。例如，添加日誌、性能監控、安全檢查等
4. 遠程代理 (remote proxy)：代理模式可以用來訪問位於不同地址空間的對象。遠程代理 (remote proxy)在分散式系統中非常常見，可以通過網路來訪問遠程服務。


# Real-world example
- Virtual Proxy for Heavy Object Initialization
- Remote Proxy for Network Requests