| Equation / Concept                                           | Formula                                                                                                                                                             | Description and Parameters                                                                                                                                                         |

| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| 1. Crowd Density Estimation                                  | D=NAD = \\\\frac{N}{A}D=AN                                                                                                                                            | Models crowd density by dividing the number of people detected (N) by the monitored area (A). Provides a basic measure of congestion levels.                                       |

| 2. Kullback–Leibler Divergence (Crowd Distribution Accuracy) | Si=t1(xi)log⁡t1(xi)t2(xi)S\_i = t\_1(x\_i) \\\\log \\\\frac{t\_1(x\_i)}{t\_2(x\_i)}Si=t1(xi)logt2(xi)t1(xi)

DKL(t1∥t2)=∑iSiD\_{KL}(t\_1 \\\\parallel t\_2) = \\\\sum\_i S\_iDKL(t1∥t2)=∑iSi | Measures the difference between actual crowd counts (t1t\_1t1) and predicted counts (t2t\_2t2) across frames. Lower divergence indicates higher prediction accuracy.                 |

| 3. Flow Rate Objective Function                              | fa-di=min⁡∑i=1n(ta+tdtin)fa\\\\text{-}di = \\\\min \\\\sum\_{i=1}^{n} (t\_a + t\_d t\_{in})fa-di=min∑i=1n(ta+tdtin)                                                           | Defines the objective to minimize crowd flow delays. Here,tat\_ata,tdt\_dtd, andtint\_{in}tindenote active, delay, and total time intervals.                                          |

| 4. Delay Minimization Function                               | lagi=min⁡∑i=1nmi(t)σt(i)lag\_i = \\\\min \\\\sum\_{i=1}^{n} m\_i(t) \\\\sigma\_t(i)lagi=min∑i=1nmi(t)σt(i)                                                                    | Reduces delays by adjusting flow based on time-varying movement behaviormi(t)m\_i(t)mi(t)and state varianceσt(i)\\\\sigma\_t(i)σt(i).                                                  |

| 5. Crowd Shifting Loss Function                              | lossi=min⁡∑i=1noutit⋅GiNloss\_i = \\\\min \\\\sum\_{i=1}^{n} out\_i t \\\\cdot \\\\frac{G\_i}{N}lossi=min∑i=1noutit⋅NGi                                                         | Optimizes crowd redirection.outiout\_iouti= output flow,GiG\_iGi= environmental/group influence,NNN= total cases.                                                                    |

| 6. Deep Learning-based Prediction Model (CNN–RNN Hybrid)     | yt=RNN(CNN(Xt),ht−1)y\_t = \\\\text{RNN}(\\\\text{CNN}(X\_t), h\_{t-1})yt=RNN(CNN(Xt),ht−1)                                                                                | Represents spatiotemporal modeling of crowd dynamics.XtX\_tXt= input features (e.g., sensor or visual data),ht−1h\_{t-1}ht−1= previous hidden state,yty\_tyt= predicted flow/density. |

